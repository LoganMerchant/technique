// Import dependencies/files
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// User inherits Sequelize's Model class
class User extends Model {
    async checkPassword(loginPw) {
        return await bcrypt.compare(loginPw, this.password);
    };
};

// Column definitions for User
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                max: 30
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5, 25]
            }
        }
    },
    {
        sequelize,
        modelName: 'user',
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        }
    }
);

module.exports = User;