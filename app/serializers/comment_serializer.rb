class CommentSerializer < ActiveModel::Serializer
  attributes :id, :comment, :author
end
