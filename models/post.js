module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      content: { type: DataTypes.TEXT, allowNull: false },
    },
    { charset: "utf8mb4", collate: "utf8mb4_general_ci" } //한글, 이모티콘 저장 }
  );
  Post.associate = (db) => {
    db.Post.belongsTo(db.User); //post.addUser
    db.Post.belongsToMany(db.Hashtag, { through: "postHashtag" }); // 다 대 다 관계
    db.Post.hasMany(db.Comment); //post.addComments 이런식으로 제공
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" });
    db.Post.belongsTo(db.Post, { as: "Retweet" });

    //db.Post.hasOne(db.PostInfo) 일 대 일 관계
  };
  return Post;
};

/*import Sequelize from "sequelize";

export default class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
          comment: "이메일",
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "Post",
        tableName: "Posts",
        charset: "utf8mb4",
        collage: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.Post.belongsTo(db.User, { foreignKey: "userIdx" });
  }
}
*/
