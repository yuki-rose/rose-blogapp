class NotificationFromAdminMailer < ApplicationMailer
  def notify(user, msg)
    @msg = msg
    mail to: user.email, sebject: "お知らせ"
  end
end
