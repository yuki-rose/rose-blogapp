class NotificationFromAdminJob < ApplicationJob
  queue_as :default

  def perform
    User.all.each do |user|
      NotificationFromAdminMailer.notify(user, msg).deliver_later
    end
  end
end
