import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuid } from "uuid";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
);

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Store for tracking operations
const operationQueue = [];
let isSyncing = false;

// ==================== UTILITY FUNCTIONS ====================

async function saveToSupabase(state) {
  try {
    const { error } = await supabase
      .from(process.env.SUPABASE_TABLE)
      .update({ data: state, updated_at: new Date() })
      .eq("id", 1);

    if (error) {
      console.error("Supabase update error:", error);
      throw error;
    }
    return true;
  } catch (err) {
    console.error("Failed to save to Supabase:", err.message);
    throw err;
  }
}

async function loadFromSupabase() {
  try {
    const { data, error } = await supabase
      .from(process.env.SUPABASE_TABLE)
      .select("data")
      .eq("id", 1)
      .single();

    if (error) throw error;
    return data?.data || { trips: [] };
  } catch (err) {
    console.error("Failed to load from Supabase:", err.message);
    return { trips: [] };
  }
}

// ==================== API ROUTES ====================

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date() });
});

// Get all trips
app.get("/api/trips", async (req, res) => {
  try {
    const state = await loadFromSupabase();
    res.json({ success: true, data: state.trips });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get single trip
app.get("/api/trips/:tripId", async (req, res) => {
  try {
    const { tripId } = req.params;
    const state = await loadFromSupabase();
    const trip = state.trips.find((t) => t.id === tripId);

    if (!trip) {
      return res.status(404).json({ success: false, error: "Trip not found" });
    }

    res.json({ success: true, data: trip });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Create trip
app.post("/api/trips", async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ success: false, error: "Trip name is required" });
    }

    const state = await loadFromSupabase();
    const newTrip = {
      id: uuid(),
      name,
      description: description || "",
      categories: [],
      itineraryDays: [],
      collapsedCategories: [],
      collapsedDays: [],
      createdAt: new Date().toISOString(),
    };

    state.trips.push(newTrip);
    await saveToSupabase(state);

    res.status(201).json({ success: true, data: newTrip });
  } catch (err) {
    console.error("Error creating trip:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Update trip
app.put("/api/trips/:tripId", async (req, res) => {
  try {
    const { tripId } = req.params;
    const { name, description } = req.body;

    const state = await loadFromSupabase();
    const trip = state.trips.find((t) => t.id === tripId);

    if (!trip) {
      return res.status(404).json({ success: false, error: "Trip not found" });
    }

    trip.name = name || trip.name;
    trip.description =
      description !== undefined ? description : trip.description;
    trip.updatedAt = new Date().toISOString();

    await saveToSupabase(state);
    res.json({ success: true, data: trip });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Delete trip
app.delete("/api/trips/:tripId", async (req, res) => {
  try {
    const { tripId } = req.params;
    const state = await loadFromSupabase();

    state.trips = state.trips.filter((t) => t.id !== tripId);
    await saveToSupabase(state);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==================== CATEGORY ROUTES ====================

// Add category to trip
app.post("/api/trips/:tripId/categories", async (req, res) => {
  try {
    const { tripId } = req.params;
    const { name, icon } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ success: false, error: "Category name is required" });
    }

    const state = await loadFromSupabase();
    const trip = state.trips.find((t) => t.id === tripId);

    if (!trip) {
      return res.status(404).json({ success: false, error: "Trip not found" });
    }

    const newCategory = {
      id: uuid(),
      name,
      icon: icon || "📌",
      places: [],
    };

    trip.categories.push(newCategory);
    await saveToSupabase(state);

    res.status(201).json({ success: true, data: newCategory });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Update category
app.put("/api/trips/:tripId/categories/:categoryId", async (req, res) => {
  try {
    const { tripId, categoryId } = req.params;
    const { name, icon } = req.body;

    const state = await loadFromSupabase();
    const trip = state.trips.find((t) => t.id === tripId);
    const category = trip?.categories.find((c) => c.id === categoryId);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, error: "Category not found" });
    }

    category.name = name || category.name;
    category.icon = icon !== undefined ? icon : category.icon;

    await saveToSupabase(state);
    res.json({ success: true, data: category });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Delete category
app.delete("/api/trips/:tripId/categories/:categoryId", async (req, res) => {
  try {
    const { tripId, categoryId } = req.params;
    const state = await loadFromSupabase();
    const trip = state.trips.find((t) => t.id === tripId);

    if (!trip) {
      return res.status(404).json({ success: false, error: "Trip not found" });
    }

    trip.categories = trip.categories.filter((c) => c.id !== categoryId);
    trip.itineraryDays.forEach((day) => {
      day.items = day.items.filter((item) => item.categoryId !== categoryId);
    });

    await saveToSupabase(state);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==================== PLACE ROUTES ====================

// Add place to category
app.post(
  "/api/trips/:tripId/categories/:categoryId/places",
  async (req, res) => {
    try {
      const { tripId, categoryId } = req.params;
      const { name, description, map, tiktok, price, rating, tags } = req.body;

      if (!name) {
        return res
          .status(400)
          .json({ success: false, error: "Place name is required" });
      }

      const state = await loadFromSupabase();
      const trip = state.trips.find((t) => t.id === tripId);
      const category = trip?.categories.find((c) => c.id === categoryId);

      if (!category) {
        return res
          .status(404)
          .json({ success: false, error: "Category not found" });
      }

      const newPlace = {
        id: uuid(),
        name,
        description: description || "",
        map: map || "",
        tiktok: tiktok || "",
        price: price || "",
        rating: rating || "",
        tags: tags || "",
        images: [],
      };

      category.places.push(newPlace);
      await saveToSupabase(state);

      res.status(201).json({ success: true, data: newPlace });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
);

// Update place
app.put(
  "/api/trips/:tripId/categories/:categoryId/places/:placeId",
  async (req, res) => {
    try {
      const { tripId, categoryId, placeId } = req.params;
      const { name, description, map, tiktok, price, rating, tags } = req.body;

      const state = await loadFromSupabase();
      const trip = state.trips.find((t) => t.id === tripId);
      const category = trip?.categories.find((c) => c.id === categoryId);
      const place = category?.places.find((p) => p.id === placeId);

      if (!place) {
        return res
          .status(404)
          .json({ success: false, error: "Place not found" });
      }

      place.name = name || place.name;
      place.description =
        description !== undefined ? description : place.description;
      place.map = map !== undefined ? map : place.map;
      place.tiktok = tiktok !== undefined ? tiktok : place.tiktok;
      place.price = price !== undefined ? price : place.price;
      place.rating = rating !== undefined ? rating : place.rating;
      place.tags = tags !== undefined ? tags : place.tags;

      await saveToSupabase(state);
      res.json({ success: true, data: place });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
);

// Delete place
app.delete(
  "/api/trips/:tripId/categories/:categoryId/places/:placeId",
  async (req, res) => {
    try {
      const { tripId, categoryId, placeId } = req.params;
      const state = await loadFromSupabase();
      const trip = state.trips.find((t) => t.id === tripId);
      const category = trip?.categories.find((c) => c.id === categoryId);

      if (!category) {
        return res
          .status(404)
          .json({ success: false, error: "Category not found" });
      }

      category.places = category.places.filter((p) => p.id !== placeId);
      trip.itineraryDays.forEach((day) => {
        day.items = day.items.filter((item) => item.placeId !== placeId);
      });

      await saveToSupabase(state);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
);

// ==================== IMAGE ROUTES ====================

// Upload image
app.post(
  "/api/trips/:tripId/categories/:categoryId/places/:placeId/images",
  async (req, res) => {
    try {
      const { tripId, categoryId, placeId } = req.params;
      const { imageData } = req.body;

      if (!imageData) {
        return res
          .status(400)
          .json({ success: false, error: "Image data is required" });
      }

      // Check image size (base64)
      const imageSizeMB = (imageData.length * 0.75) / (1024 * 1024);
      if (imageSizeMB > 5) {
        return res.status(400).json({
          success: false,
          error: `Image too large. Max 5MB, got ${imageSizeMB.toFixed(2)}MB`,
        });
      }

      const state = await loadFromSupabase();
      const trip = state.trips.find((t) => t.id === tripId);
      const category = trip?.categories.find((c) => c.id === categoryId);
      const place = category?.places.find((p) => p.id === placeId);

      if (!place) {
        return res
          .status(404)
          .json({ success: false, error: "Place not found" });
      }

      // Check image count limit
      if (place.images.length >= 100) {
        return res.status(400).json({
          success: false,
          error: "Maximum 100 images per place",
        });
      }

      const image = {
        id: uuid(),
        data: imageData,
        uploadedAt: new Date().toISOString(),
      };

      place.images.push(image);
      await saveToSupabase(state);

      res.status(201).json({ success: true, data: image });
    } catch (err) {
      console.error("Error uploading image:", err);
      res.status(500).json({ success: false, error: err.message });
    }
  },
);

// Delete image
app.delete(
  "/api/trips/:tripId/categories/:categoryId/places/:placeId/images/:imageId",
  async (req, res) => {
    try {
      const { tripId, categoryId, placeId, imageId } = req.params;
      const state = await loadFromSupabase();
      const trip = state.trips.find((t) => t.id === tripId);
      const category = trip?.categories.find((c) => c.id === categoryId);
      const place = category?.places.find((p) => p.id === placeId);

      if (!place) {
        return res
          .status(404)
          .json({ success: false, error: "Place not found" });
      }

      place.images = place.images.filter((img) => img.id !== imageId);
      await saveToSupabase(state);

      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
);

// ==================== ITINERARY ROUTES ====================

// Add day
app.post("/api/trips/:tripId/itinerary/days", async (req, res) => {
  try {
    const { tripId } = req.params;
    const { number } = req.body;

    if (!number) {
      return res
        .status(400)
        .json({ success: false, error: "Day number is required" });
    }

    const state = await loadFromSupabase();
    const trip = state.trips.find((t) => t.id === tripId);

    if (!trip) {
      return res.status(404).json({ success: false, error: "Trip not found" });
    }

    if (trip.itineraryDays.some((d) => d.number === number)) {
      return res
        .status(400)
        .json({ success: false, error: "Day already exists" });
    }

    const day = {
      id: uuid(),
      number,
      items: [],
    };

    trip.itineraryDays.push(day);
    await saveToSupabase(state);

    res.status(201).json({ success: true, data: day });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Add item to day
app.post("/api/trips/:tripId/itinerary/days/:dayId/items", async (req, res) => {
  try {
    const { tripId, dayId } = req.params;
    const { categoryId, placeId, note } = req.body;

    if (!categoryId || !placeId) {
      return res
        .status(400)
        .json({ success: false, error: "Category and place are required" });
    }

    const state = await loadFromSupabase();
    const trip = state.trips.find((t) => t.id === tripId);
    const day = trip?.itineraryDays.find((d) => d.id === dayId);

    if (!day) {
      return res.status(404).json({ success: false, error: "Day not found" });
    }

    const item = {
      id: uuid(),
      categoryId,
      placeId,
      note: note || "",
    };

    day.items.push(item);
    await saveToSupabase(state);

    res.status(201).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Delete day
app.delete("/api/trips/:tripId/itinerary/days/:dayId", async (req, res) => {
  try {
    const { tripId, dayId } = req.params;
    const state = await loadFromSupabase();
    const trip = state.trips.find((t) => t.id === tripId);

    if (!trip) {
      return res.status(404).json({ success: false, error: "Trip not found" });
    }

    trip.itineraryDays = trip.itineraryDays.filter((d) => d.id !== dayId);
    await saveToSupabase(state);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Delete itinerary item
app.delete(
  "/api/trips/:tripId/itinerary/days/:dayId/items/:itemId",
  async (req, res) => {
    try {
      const { tripId, dayId, itemId } = req.params;
      const state = await loadFromSupabase();
      const trip = state.trips.find((t) => t.id === tripId);
      const day = trip?.itineraryDays.find((d) => d.id === dayId);

      if (!day) {
        return res.status(404).json({ success: false, error: "Day not found" });
      }

      day.items = day.items.filter((i) => i.id !== itemId);
      await saveToSupabase(state);

      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
);

// ==================== STATE SYNC ====================

// Get full state
app.get("/api/state", async (req, res) => {
  try {
    const state = await loadFromSupabase();
    res.json({ success: true, data: state });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==================== ERROR HANDLING ====================

app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({
    success: false,
    error: err.message || "Internal server error",
  });
});

// ==================== START SERVER ====================

app.listen(PORT, () => {
  console.log(`🚀 Travel Planner Server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV}`);
  console.log(`✅ Health check: http://localhost:${PORT}/health`);
});
