'use strict';

exports.up = async (pgm) => {
  pgm.createExtension('uuid-ossp', { ifNotExists: true });

  pgm.createType('enum_users_role', ['admin', 'editor']);

  pgm.createTable('users', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('uuid_generate_v4()') },
    email: { type: 'varchar(255)', notNull: true, unique: true },
    password_hash: { type: 'text', notNull: true },
    role: { type: 'enum_users_role', notNull: true, default: 'editor' },
    created_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
    updated_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
  });

  pgm.createTable('media', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('uuid_generate_v4()') },
    filename: { type: 'text', notNull: true },
    original_name: { type: 'text', notNull: true },
    mime_type: { type: 'text', notNull: true },
    size_bytes: { type: 'integer', notNull: true },
    url: { type: 'text', notNull: true },
    uploaded_by: {
      type: 'uuid',
      references: 'users(id)',
      onDelete: 'SET NULL',
    },
    created_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
    updated_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
  });

  pgm.createType('enum_projects_status', ['draft', 'published']);

  const fk = {
    type: 'uuid',
    references: 'media(id)',
    onDelete: 'SET NULL',
  };

  pgm.createTable('projects', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('uuid_generate_v4()') },
    title: { type: 'text', notNull: true },
    slug: { type: 'varchar(255)', notNull: true, unique: true },
    date: { type: 'text', notNull: true },
    excerpt: { type: 'text', notNull: true },
    body: { type: 'text' },
    category: { type: 'text' },
    link: { type: 'text' },
    status: { type: 'enum_projects_status', notNull: true, default: 'draft' },
    image_id: fk,
    image_2_id: fk,
    tech_tab_img_id: fk,
    design_tab_img_id: fk,
    tech_tab_img_alt: { type: 'text' },
    tech_description: { type: 'text' },
    design_tab_img_alt: { type: 'text' },
    design_description: { type: 'text' },
    tech_1_id: fk,
    tech_1_name: { type: 'text' },
    tech_2_id: fk,
    tech_2_name: { type: 'text' },
    tech_3_id: fk,
    tech_3_name: { type: 'text' },
    tech_4_id: fk,
    tech_4_name: { type: 'text' },
    tech_5_id: fk,
    tech_5_name: { type: 'text' },
    base_color: { type: 'text' },
    base_text_color: { type: 'text' },
    tailwind_color: { type: 'text' },
    created_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
    updated_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
  });
};

exports.down = async (pgm) => {
  pgm.dropTable('projects');
  pgm.dropTable('media');
  pgm.dropTable('users');
  pgm.dropType('enum_projects_status');
  pgm.dropType('enum_users_role');
  pgm.dropExtension('uuid-ossp');
};