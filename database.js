const Sequelize = require('sequelize');
const conn = new Sequelize (process.env.DATABASE_URL || 'postgres://localhost/AcmeDb')

const User = conn.define ('User', {

    name : {
        type: Sequelize.STRING,
        validate: {
            notNull: false,
            notEmpty: true
        }
    },

    id : {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
    }

});

const Department = conn.define ('Department', {

    name : {
        type: Sequelize.STRING,
        validate: {
            notNull: false,
            notEmpty: true
        }
    },

    id : {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
    }

});

const syncAndSeed = async() => {

    await conn.sync({force: true});

    const users = ['Stupid Face', 'Programming Parrot', 'Prof', 'Smooth Poopie', 'Fishloaf'];
    await Promise.all(users.map(user => {User.create({name: user})}));

    const departments = ['Software Engineering', 'Toilets', 'Sandwhich Art', 'Coffee Making'];
    await Promise.all(departments.map(department => {Department.create({name: department})}));
}

syncAndSeed();


User.belongsTo(Department, {as: 'department'});
Department.hasMany(User, {foreignKey: 'departmentId'})

module.exports = {
    syncAndSeed,
    User,
    Department
}