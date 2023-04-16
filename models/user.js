module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING(30), //STRING, TEXT, BOOLEAN, INTEGER(정수), FLOAT(실수) , DATETIME
        allowNull: false, //필수인지 아닌지 false면 필수
        unique: true, //고유한 값
        comment: "이메일",
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false, //필수인지 아닌지 false면 필수
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false, //필수인지 아닌지 false면 필수
      },
    },
    { charset: "utf8", collate: "utf8_general_ci" } //한글 저장 }
  );
  User.associate = (db) => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" }); //중간 테이블 이름
    db.User.belongsToMany(db.User, {
      through: "Follow", //중간 테이블 이름
      as: "Followers",
      foreingKey: "FollowingId", //column 이름 바꾸는 느낌
    });
    db.User.belongsToMany(db.User, {
      through: "Follow", //중간 테이블 이름
      as: "Followings",
      foreingKey: "FollowersId",
    });
  };
  return User;
};

/*import Sequelize from "sequelize";

export default class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true,
          comment: "이메일",
        },
        password: {
          type: Sequelize.STRING(200),
          allowNull: false,
          comment: "비밀번호",
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "User",
        tableName: "users",
        charset: "utf8",
        collage: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Post, { foreignKey: "userIdx" });
  }
}*/
