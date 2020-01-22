# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_01_20_060105) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "action_mailbox_inbound_emails", force: :cascade do |t|
    t.integer "status", default: 0, null: false
    t.string "message_id", null: false
    t.string "message_checksum", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "tenant_id"
    t.index ["message_id", "message_checksum"], name: "index_action_mailbox_inbound_emails_uniqueness", unique: true
    t.index ["tenant_id"], name: "index_action_mailbox_inbound_emails_on_tenant_id"
  end

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.bigint "tenant_id"
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
    t.index ["tenant_id"], name: "index_active_storage_attachments_on_tenant_id"
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.bigint "tenant_id"
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
    t.index ["tenant_id"], name: "index_active_storage_blobs_on_tenant_id"
  end

  create_table "api_tokens", force: :cascade do |t|
    t.string "name"
    t.text "api_token"
    t.bigint "user_id"
    t.bigint "tenant_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["tenant_id"], name: "index_api_tokens_on_tenant_id"
    t.index ["user_id"], name: "index_api_tokens_on_user_id"
  end

  create_table "attachments", force: :cascade do |t|
    t.bigint "created_by_id"
    t.bigint "tenant_id"
    t.string "attachable_type"
    t.bigint "attachable_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["attachable_type", "attachable_id"], name: "index_attachments_on_attachable_type_and_attachable_id"
    t.index ["created_by_id"], name: "index_attachments_on_created_by_id"
    t.index ["tenant_id"], name: "index_attachments_on_tenant_id"
  end

  create_table "audits", force: :cascade do |t|
    t.integer "action"
    t.integer "associated_id"
    t.json "parameters"
    t.bigint "created_by_id"
    t.bigint "tenant_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "associated_type"
    t.index ["created_by_id"], name: "index_audits_on_created_by_id"
    t.index ["tenant_id"], name: "index_audits_on_tenant_id"
  end

  create_table "case_groups", force: :cascade do |t|
    t.string "caseable_type"
    t.bigint "caseable_id"
    t.bigint "group_id"
    t.bigint "tenant_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["caseable_type", "caseable_id"], name: "index_case_groups_on_caseable_type_and_caseable_id"
    t.index ["group_id"], name: "index_case_groups_on_group_id"
    t.index ["tenant_id"], name: "index_case_groups_on_tenant_id"
  end

  create_table "case_members", force: :cascade do |t|
    t.string "caseable_type"
    t.bigint "caseable_id"
    t.bigint "user_id"
    t.integer "role"
    t.bigint "tenant_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["caseable_type", "caseable_id"], name: "index_case_members_on_caseable_type_and_caseable_id"
    t.index ["tenant_id"], name: "index_case_members_on_tenant_id"
    t.index ["user_id"], name: "index_case_members_on_user_id"
  end

  create_table "case_template_users", force: :cascade do |t|
    t.bigint "case_template_id"
    t.bigint "user_id"
    t.integer "role"
    t.bigint "tenant_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["case_template_id"], name: "index_case_template_users_on_case_template_id"
    t.index ["tenant_id"], name: "index_case_template_users_on_tenant_id"
    t.index ["user_id"], name: "index_case_template_users_on_user_id"
  end

  create_table "case_templates", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.bigint "status_id"
    t.bigint "priority_id"
    t.bigint "created_by_id"
    t.bigint "tenant_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "assigned_to_id"
    t.index ["assigned_to_id"], name: "index_case_templates_on_assigned_to_id"
    t.index ["created_by_id"], name: "index_case_templates_on_created_by_id"
    t.index ["priority_id"], name: "index_case_templates_on_priority_id"
    t.index ["status_id"], name: "index_case_templates_on_status_id"
    t.index ["tenant_id"], name: "index_case_templates_on_tenant_id"
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
    t.text "reason_for_merging"
    t.bigint "tenant_id"
    t.index ["ancestry"], name: "index_cases_on_ancestry"
    t.index ["assigned_to_id"], name: "index_cases_on_assigned_to_id"
    t.index ["created_by_id"], name: "index_cases_on_created_by_id"
    t.index ["priority_id"], name: "index_cases_on_priority_id"
    t.index ["status_id"], name: "index_cases_on_status_id"
    t.index ["tenant_id"], name: "index_cases_on_tenant_id"
  end

  create_table "comments", force: :cascade do |t|
    t.text "comment"
    t.bigint "created_by_id"
    t.string "commentable_type"
    t.bigint "commentable_id"
    t.bigint "tenant_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["commentable_type", "commentable_id"], name: "index_comments_on_commentable_type_and_commentable_id"
    t.index ["created_by_id"], name: "index_comments_on_created_by_id"
    t.index ["tenant_id"], name: "index_comments_on_tenant_id"
  end

  create_table "create_case_email_addresses", force: :cascade do |t|
    t.string "email"
    t.bigint "tenant_id"
    t.bigint "case_template_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "created_by_id"
    t.bigint "default_creator_id"
    t.index ["case_template_id"], name: "index_create_case_email_addresses_on_case_template_id"
    t.index ["created_by_id"], name: "index_create_case_email_addresses_on_created_by_id"
    t.index ["default_creator_id"], name: "index_create_case_email_addresses_on_default_creator_id"
    t.index ["tenant_id"], name: "index_create_case_email_addresses_on_tenant_id"
  end

  create_table "forms", force: :cascade do |t|
    t.string "name"
    t.bigint "created_by_id"
    t.bigint "tenant_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.json "form_schema"
    t.json "ui_schema"
    t.index ["created_by_id"], name: "index_forms_on_created_by_id"
    t.index ["tenant_id"], name: "index_forms_on_tenant_id"
  end

  create_table "group_users", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "group_id"
    t.bigint "tenant_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["group_id"], name: "index_group_users_on_group_id"
    t.index ["tenant_id"], name: "index_group_users_on_tenant_id"
    t.index ["user_id"], name: "index_group_users_on_user_id"
  end

  create_table "groups", force: :cascade do |t|
    t.string "name"
    t.bigint "tenant_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["tenant_id"], name: "index_groups_on_tenant_id"
  end

  create_table "indicators", force: :cascade do |t|
    t.string "name"
    t.text "indicator"
    t.text "description"
    t.integer "indicator_type"
    t.bigint "created_by_id"
    t.bigint "case_id"
    t.bigint "tenant_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["case_id"], name: "index_indicators_on_case_id"
    t.index ["created_by_id"], name: "index_indicators_on_created_by_id"
    t.index ["tenant_id"], name: "index_indicators_on_tenant_id"
  end

  create_table "pg_search_documents", force: :cascade do |t|
    t.text "content"
    t.string "searchable_type"
    t.bigint "searchable_id"
    t.bigint "tenant_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["searchable_type", "searchable_id"], name: "index_pg_search_documents_on_searchable_type_and_searchable_id"
    t.index ["tenant_id"], name: "index_pg_search_documents_on_tenant_id"
  end

  create_table "priorities", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.bigint "tenant_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["tenant_id"], name: "index_priorities_on_tenant_id"
  end

  create_table "statuses", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.bigint "tenant_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "default_status", default: false, null: false
    t.index ["tenant_id"], name: "index_statuses_on_tenant_id"
  end

  create_table "taggings", id: :serial, force: :cascade do |t|
    t.integer "tag_id"
    t.integer "tenant_id"
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
    t.integer "tenant_id"
    t.integer "taggings_count", default: 0
    t.index ["name"], name: "index_tags_on_name", unique: true
  end

  create_table "task_groups", force: :cascade do |t|
    t.string "caseable_type"
    t.bigint "caseable_id"
    t.string "name"
    t.bigint "tenant_id"
    t.bigint "created_by_id"
    t.index ["caseable_type", "caseable_id"], name: "index_task_groups_on_caseable_type_and_caseable_id"
    t.index ["created_by_id"], name: "index_task_groups_on_created_by_id"
    t.index ["tenant_id"], name: "index_task_groups_on_tenant_id"
  end

  create_table "task_templates", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.bigint "created_by_id"
    t.bigint "tenant_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "assigned_to_id"
    t.index ["assigned_to_id"], name: "index_task_templates_on_assigned_to_id"
    t.index ["created_by_id"], name: "index_task_templates_on_created_by_id"
    t.index ["tenant_id"], name: "index_task_templates_on_tenant_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.boolean "done", default: false, null: false
    t.bigint "created_by_id"
    t.bigint "assigned_to_id"
    t.bigint "tenant_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "position"
    t.bigint "task_group_id"
    t.index ["assigned_to_id"], name: "index_tasks_on_assigned_to_id"
    t.index ["created_by_id"], name: "index_tasks_on_created_by_id"
    t.index ["task_group_id"], name: "index_tasks_on_task_group_id"
    t.index ["tenant_id"], name: "index_tasks_on_tenant_id"
  end

  create_table "tenants", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.bigint "tenant_id"
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
    t.datetime "disabled_at"
    t.index ["tenant_id"], name: "index_users_on_tenant_id"
  end

  add_foreign_key "action_mailbox_inbound_emails", "tenants"
  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_attachments", "tenants"
  add_foreign_key "active_storage_blobs", "tenants"
  add_foreign_key "api_tokens", "tenants"
  add_foreign_key "api_tokens", "users"
  add_foreign_key "attachments", "tenants"
  add_foreign_key "attachments", "users", column: "created_by_id"
  add_foreign_key "audits", "tenants"
  add_foreign_key "audits", "users", column: "created_by_id"
  add_foreign_key "case_groups", "groups"
  add_foreign_key "case_groups", "tenants"
  add_foreign_key "case_members", "tenants"
  add_foreign_key "case_members", "users"
  add_foreign_key "case_template_users", "case_templates"
  add_foreign_key "case_template_users", "tenants"
  add_foreign_key "case_template_users", "users"
  add_foreign_key "case_templates", "priorities"
  add_foreign_key "case_templates", "statuses"
  add_foreign_key "case_templates", "tenants"
  add_foreign_key "case_templates", "users", column: "assigned_to_id"
  add_foreign_key "case_templates", "users", column: "created_by_id"
  add_foreign_key "cases", "priorities"
  add_foreign_key "cases", "statuses"
  add_foreign_key "cases", "tenants"
  add_foreign_key "cases", "users", column: "assigned_to_id"
  add_foreign_key "cases", "users", column: "created_by_id"
  add_foreign_key "comments", "tenants"
  add_foreign_key "comments", "users", column: "created_by_id"
  add_foreign_key "create_case_email_addresses", "case_templates"
  add_foreign_key "create_case_email_addresses", "tenants"
  add_foreign_key "create_case_email_addresses", "users", column: "created_by_id"
  add_foreign_key "create_case_email_addresses", "users", column: "default_creator_id"
  add_foreign_key "forms", "tenants"
  add_foreign_key "forms", "users", column: "created_by_id"
  add_foreign_key "group_users", "groups"
  add_foreign_key "group_users", "tenants"
  add_foreign_key "group_users", "users"
  add_foreign_key "groups", "tenants"
  add_foreign_key "indicators", "cases"
  add_foreign_key "indicators", "tenants"
  add_foreign_key "indicators", "users", column: "created_by_id"
  add_foreign_key "pg_search_documents", "tenants"
  add_foreign_key "priorities", "tenants"
  add_foreign_key "statuses", "tenants"
  add_foreign_key "taggings", "tenants"
  add_foreign_key "tags", "tenants"
  add_foreign_key "task_groups", "tenants"
  add_foreign_key "task_groups", "users", column: "created_by_id"
  add_foreign_key "task_templates", "tenants"
  add_foreign_key "task_templates", "users", column: "assigned_to_id"
  add_foreign_key "task_templates", "users", column: "created_by_id"
  add_foreign_key "tasks", "task_groups"
  add_foreign_key "tasks", "tenants"
  add_foreign_key "tasks", "users", column: "assigned_to_id"
  add_foreign_key "tasks", "users", column: "created_by_id"
  add_foreign_key "users", "tenants"
end
