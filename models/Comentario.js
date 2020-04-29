let Comentario = (sequelize, DataTypes) => {
    return sequelize.define(
        'Comentario',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull:false
            },
            texto: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            usuarios_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                // references: 'usuarios', // <<< Note, its table's name, not object name
                // referencesKey: 'id' // <<< Note, its a column name
          },
            posts_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                // references: 'usuarios', // <<< Note, its table's name, not object name
                // referencesKey: 'id' // <<< Note, its a column name
        }
        },{
            tableName: "comentarios",
            timestamps: false
        }

    );
}

module.exports = Comentario;