// Import Sequelize model and connection
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Post inherits Sequelize's Model class
class Post extends Model {};

// Column definitions
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3]
            }
        },
        post_content: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;