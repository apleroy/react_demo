class ArticleSerializer < ActiveModel::Serializer
  attributes :id, :title, :author, :body
end
