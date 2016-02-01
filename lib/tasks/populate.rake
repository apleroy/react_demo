namespace :db do
  task populate: :environment do

    Comment.destroy_all
    Article.destroy_all

    10.times do
      Comment.create(
          author: FFaker::Name.first_name + " " + FFaker::Name.last_name,
          comment: FFaker::HipsterIpsum.words(10).join(' ')
      )
    end

    5.times do
      Article.create(
          author: FFaker::Name.first_name + " " + FFaker::Name.last_name,
          title: FFaker::HipsterIpsum.words(5).join(' '),
          body: FFaker::Lorem.paragraph(7)
      )
    end

    end
  end