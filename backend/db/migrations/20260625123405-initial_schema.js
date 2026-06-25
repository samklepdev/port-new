'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      email: { type: Sequelize.STRING, unique: true, allowNull: false },
      password_hash: { type: Sequelize.STRING, allowNull: false },
      role: { type: Sequelize.ENUM('admin', 'editor'), defaultValue: 'editor' },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });

      await queryInterface.createTable('projects', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      title: { type: Sequelize.STRING, allowNull: false },
      slug: { type: Sequelize.STRING, unique: true, allowNull: false },
      summary: Sequelize.TEXT,
      body: Sequelize.TEXT,
      tags: { type: Sequelize.ARRAY(Sequelize.STRING), defaultValue: [] },
      status: { type: Sequelize.ENUM('draft', 'published'), defaultValue: 'draft' },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });

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
  },

 down: async (queryInterface) => {
    await queryInterface.dropTable('projects');
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('media');
  },
};
