'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Users table
    await queryInterface.createTable('users', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      email: { type: Sequelize.STRING, unique: true, allowNull: false },
      password_hash: { type: Sequelize.STRING, allowNull: false },
      role: { type: Sequelize.ENUM('admin', 'editor'), defaultValue: 'editor', allowNull: false },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });

    // Media table (must exist before projects references it)
    await queryInterface.createTable('media', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      filename: { type: Sequelize.STRING, allowNull: false },
      original_name: { type: Sequelize.STRING, allowNull: false },
      mime_type: { type: Sequelize.STRING, allowNull: false },
      size_bytes: { type: Sequelize.INTEGER, allowNull: false },
      url: { type: Sequelize.STRING, allowNull: false },
      uploaded_by: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'users', key: 'id' },
        onDelete: 'SET NULL',
      },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });

    const fk = {
      type: Sequelize.UUID,
      allowNull: true,
      references: { model: 'media', key: 'id' },
      onDelete: 'SET NULL',
    };

    // Projects table
    await queryInterface.createTable('projects', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      title: { type: Sequelize.STRING, allowNull: false },
      slug: { type: Sequelize.STRING, unique: true, allowNull: false },
      date: { type: Sequelize.STRING, allowNull: false },
      excerpt: { type: Sequelize.TEXT, allowNull: false },
      body: { type: Sequelize.TEXT, allowNull: true },
      category: { type: Sequelize.STRING, allowNull: true },
      link: { type: Sequelize.STRING, allowNull: true },
      status: { type: Sequelize.ENUM('draft', 'published'), defaultValue: 'draft', allowNull: false },

      // Image FKs
      image_id: fk,
      image_2_id: fk,
      tech_tab_img_id: fk,
      design_tab_img_id: fk,

      // Tab content
      tech_tab_img_alt: { type: Sequelize.STRING, allowNull: true },
      tech_description: { type: Sequelize.TEXT, allowNull: true },
      design_tab_img_alt: { type: Sequelize.STRING, allowNull: true },
      design_description: { type: Sequelize.TEXT, allowNull: true },

      // Tech stack icon FKs + name strings
      tech_1_id: fk,
      tech_1_name: { type: Sequelize.STRING, allowNull: true },
      tech_2_id: fk,
      tech_2_name: { type: Sequelize.STRING, allowNull: true },
      tech_3_id: fk,
      tech_3_name: { type: Sequelize.STRING, allowNull: true },
      tech_4_id: fk,
      tech_4_name: { type: Sequelize.STRING, allowNull: true },
      tech_5_id: fk,
      tech_5_name: { type: Sequelize.STRING, allowNull: true },

      // Theming
      base_color: { type: Sequelize.STRING, allowNull: true },
      base_text_color: { type: Sequelize.STRING, allowNull: true },
      tailwind_color: { type: Sequelize.STRING, allowNull: true },

      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('projects');
    await queryInterface.dropTable('media');
    await queryInterface.dropTable('users');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_users_role"');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_projects_status"');
  },
};