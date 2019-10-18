# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_09_27_082441) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "case_members", force: :cascade do |t|
    t.bigint "case_id"
    t.bigint "user_id"
    t.integer "role"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["case_id"], name: "index_case_members_on_case_id"
    t.index ["user_id"], name: "index_case_members_on_user_id"
  end

  create_table "cases", force: :cascade do |t|
    t.string "name"
    t.bigint "status_id"
    t.bigint "priority_id"
    t.bigint "created_by_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "description"
    t.bigint "assigned_to_id"
    t.string "ancestry"
    t.index ["ancestry"], name: "index_cases_on_ancestry"
    t.index ["assigned_to_id"], name: "index_cases_on_assigned_to_id"
    t.index ["created_by_id"], name: "index_cases_on_created_by_id"
    t.index ["priority_id"], name: "index_cases_on_priority_id"
    t.index ["status_id"], name: "index_cases_on_status_id"
  end

  create_table "comments", force: :cascade do |t|
    t.text "comment"
    t.bigint "created_by_id"
    t.string "commentable_type"
    t.bigint "commentable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["commentable_type", "commentable_id"], name: "index_comments_on_commentable_type_and_commentable_id"
    t.index ["created_by_id"], name: "index_comments_on_created_by_id"
  end

  create_table "indicators", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.text "text"
    t.bigint "created_by_id"
    t.bigint "case_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["case_id"], name: "index_indicators_on_case_id"
    t.index ["created_by_id"], name: "index_indicators_on_created_by_id"
  end

  create_table "priorities", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "statuses", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "taggings", id: :serial, force: :cascade do |t|
    t.integer "tag_id"
    t.string "taggable_type"
    t.integer "taggable_id"
    t.string "tagger_type"
    t.integer "tagger_id"
    t.string "context", limit: 128
    t.datetime "created_at"
    t.index ["context"], name: "index_taggings_on_context"
    t.index ["tag_id", "taggable_id", "taggable_type", "context", "tagger_id", "tagger_type"], name: "taggings_idx", unique: true
    t.index ["tag_id"], name: "index_taggings_on_tag_id"
    t.index ["taggable_id", "taggable_type", "context"], name: "index_taggings_on_taggable_id_and_taggable_type_and_context"
    t.index ["taggable_id", "taggable_type", "tagger_id", "context"], name: "taggings_idy"
    t.index ["taggable_id"], name: "index_taggings_on_taggable_id"
    t.index ["taggable_type"], name: "index_taggings_on_taggable_type"
    t.index ["tagger_id", "tagger_type"], name: "index_taggings_on_tagger_id_and_tagger_type"
    t.index ["tagger_id"], name: "index_taggings_on_tagger_id"
  end

  create_table "tags", id: :serial, force: :cascade do |t|
    t.string "name"
    t.integer "taggings_count", default: 0
    t.index ["name"], name: "index_tags_on_name", unique: true
  end

  create_table "tasks", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.boolean "done", default: false, null: false
    t.bigint "case_id"
    t.bigint "created_by_id"
    t.bigint "assigned_to_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["assigned_to_id"], name: "index_tasks_on_assigned_to_id"
    t.index ["case_id"], name: "index_tasks_on_case_id"
    t.index ["created_by_id"], name: "index_tasks_on_created_by_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.string "auth_tokens"
    t.string "unconfirmed_email"
    t.string "confirmation_token"
    t.datetime "confirmation_sent_at"
    t.datetime "confirmed_at"
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.string "last_sign_in_ip"
    t.datetime "last_sign_in_at"
    t.string "invitation_token"
    t.datetime "invitation_sent_at"
    t.datetime "invitation_accepted_at"
    t.datetime "invitation_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "admin", default: false, null: false
  end

  add_foreign_key "case_members", "cases"
  add_foreign_key "case_members", "users"
  add_foreign_key "cases", "priorities"
  add_foreign_key "cases", "statuses"
  add_foreign_key "cases", "users", column: "assigned_to_id"
  add_foreign_key "cases", "users", column: "created_by_id"
  add_foreign_key "comments", "users", column: "created_by_id"
  add_foreign_key "indicators", "cases"
  add_foreign_key "indicators", "users", column: "created_by_id"
  add_foreign_key "tasks", "cases"
  add_foreign_key "tasks", "users", column: "assigned_to_id"
  add_foreign_key "tasks", "users", column: "created_by_id"
end
