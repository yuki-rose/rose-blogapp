# Pin npm packages by running ./bin/importmap

pin "application"
pin "trix"
pin "@rails/actiontext", to: "actiontext.esm.js"
pin "@hotwired/turbo-rails", to: "turbo.min.js", preload: true
pin "jquery", to: "https://ga.jspm.io/npm:jquery@3.7.1/dist/jquery.js"
# pin "axios", to: "https://ga.jspm.io/npm:axios@1.6.7/index.js"
pin "axios", to: "https://ga.jspm.io/npm:axios@1.12.2/dist/esm/axios.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"
