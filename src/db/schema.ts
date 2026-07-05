import {
  boolean,
  date,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: text("id").primaryKey(),
    fullName: text("full_name").notNull(),
    registerNumber: text("register_number"),
    collegeName: text("college_name"),
    department: text("department"),
    yearOfStudy: integer("year_of_study"),
    email: text("email").notNull(),
    mobileNumber: text("mobile_number"),
    gender: text("gender"),
    city: text("city"),
    profilePhoto: text("profile_photo"),
    emergencyContact: text("emergency_contact"),
    foodPreference: text("food_preference"),
    accommodationRequired: boolean("accommodation_required").default(false).notNull(),
    passwordHash: text("password_hash").notNull(),
    role: text("role").default("student").notNull(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    verificationToken: text("verification_token"),
    resetToken: text("reset_token"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    emailIdx: uniqueIndex("users_email_idx").on(table.email),
    registerIdx: uniqueIndex("users_register_number_idx").on(table.registerNumber),
  }),
);

export const events = pgTable(
  "events",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    category: text("category").notNull(),
    description: text("description").notNull(),
    eventDate: date("event_date").notNull(),
    startTime: text("start_time").notNull(),
    venue: text("venue").notNull(),
    registrationDeadline: date("registration_deadline").notNull(),
    availableSeats: integer("available_seats").default(100).notNull(),
    rules: text("rules").notNull(),
    facultyCoordinator: text("faculty_coordinator").notNull(),
    studentCoordinator: text("student_coordinator").notNull(),
    prizeDetails: text("prize_details").notNull(),
    posterUrl: text("poster_url").notNull(),
    status: text("status").default("open").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    slugIdx: uniqueIndex("events_slug_idx").on(table.slug),
  }),
);

export const registrations = pgTable(
  "registrations",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    eventId: text("event_id").notNull().references(() => events.id, { onDelete: "cascade" }),
    status: text("status").default("pending").notNull(),
    confirmationCode: text("confirmation_code").notNull(),
    checkedIn: boolean("checked_in").default(false).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    participantEventIdx: uniqueIndex("registrations_user_event_idx").on(table.userId, table.eventId),
  }),
);

export const announcements = pgTable("announcements", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  audience: text("audience").default("all").notNull(),
  priority: text("priority").default("normal").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const certificates = pgTable("certificates", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  eventId: text("event_id").notNull().references(() => events.id, { onDelete: "cascade" }),
  type: text("type").default("Participation").notNull(),
  certificateNo: text("certificate_no").notNull(),
  fileUrl: text("file_url").notNull(),
  issuedAt: timestamp("issued_at", { withTimezone: true }).defaultNow().notNull(),
});

export const coordinators = pgTable("coordinators", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  department: text("department").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  eventId: text("event_id").references(() => events.id, { onDelete: "set null" }),
});

export type User = typeof users.$inferSelect;
export type Event = typeof events.$inferSelect;
export type Registration = typeof registrations.$inferSelect;
export type Announcement = typeof announcements.$inferSelect;
export type Certificate = typeof certificates.$inferSelect;
export type Coordinator = typeof coordinators.$inferSelect;
