module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    //테이블명은 posts
    "Post",
    {
      content: { type: DataTypes.TEXT, allowNull: false },
    },
    { charset: "utf8mb4", collate: "utf8mb4_general_ci" } //한글, 이모티콘 저장 }
  );
  Post.associate = (db) => {
    db.Post.belongsTo(db.User); //테이블에 UserId 컬럼 생김
    db.Post.belongsToMany(db.Hashtag, { through: "postHashtag" }); // 다 대 다 관계
    db.Post.hasMany(db.Comment); //post.addComments 이런식으로 제공
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" });
    db.Post.belongsTo(db.Post, { as: "Retweet" });

    //db.Post.hasOne(db.PostInfo) 일 대 일 관계
  };
  return Post;
};
