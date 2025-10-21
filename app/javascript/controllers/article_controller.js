import { Controller } from "@hotwired/stimulus"
import axios from "../modules/axios"
import $ from "jquery"
import { likeArticle, unlikeArticle } from "../modules/handle_heart"

// ✅ Stimulus controller
export default class extends Controller {
  static values = { articleId: Number }
  static targets = ["commentForm", "showButton"]

  connect() {
    console.log("Article controller connected")

    // ✅ 初期状態の取得
    this.fetchLikeStatus()
    this.loadComments()
  }

  // ❤️ いいね関連
  fetchLikeStatus() {
    axios.get(`/articles/${this.articleIdValue}/like.json`)
      .then((response) => {
        const hasLiked = response.data.hasLiked
        this.handleHeartDisplay(hasLiked)
      })
      .catch((error) => {
        console.error("Error fetching like status:", error)
      })
  }

  like() {
    // this.handleHeartDisplay の「this」を固定して渡す
    likeArticle(this.articleIdValue, this.handleHeartDisplay.bind(this))
  }

  unlike() {
    unlikeArticle(this.articleIdValue, this.handleHeartDisplay.bind(this))
  }

  handleHeartDisplay(hasLiked) {
    if (hasLiked) {
      $('.active-heart').removeClass('hidden')
      $('.inactive-heart').addClass('hidden')
    } else {
      $('.inactive-heart').removeClass('hidden')
      $('.active-heart').addClass('hidden')
    }
  }
  // 💬 コメント関連 -----------------------------------

  // ✅ コメント読み込み
  loadComments() {
    const articleId = this.articleIdValue

    axios.get(`/articles/${articleId}/comments.json`)
      .then((response) => {
        const comments = response.data
        const container = document.querySelector('.comments-container')
        container.innerHTML = '' // 一度クリア
        comments.forEach((comment) => this.renderComment(comment))
      })
      .catch((error) => {
        console.error("Error loading comments:", error)
      })
  }

  // ✅ コメント追加
  addComment() {
    const content = document.querySelector('#comment_content').value
    const articleId = this.articleIdValue

    if (!content) {
      alert('コメントを入力してください')
      return
    }

    axios.post(`/articles/${articleId}/comments`, {
      comment: { content: content }
    })
      .then((res) => {
        const comment = res.data
        this.renderComment(comment) // 共通関数で追加
        document.querySelector('#comment_content').value = ''
        this.toggleCommentForm(false) // 投稿後にフォームを閉じる
      })
      .catch((e) => {
        console.error('Error posting comment:', e)
        alert('コメントの投稿に失敗しました。')
      })
  }

  // ✅ コメント表示HTML生成（共通）
  renderComment(comment) {
    const container = document.querySelector('.comments-container')
    container.insertAdjacentHTML('beforeend', `
      <div class="article_comment">
        <p>${comment.content}</p>
      </div>
    `)
  }

  // ✅ フォーム表示切替
  toggleCommentForm(show = true) {
    this.commentFormTarget.classList.toggle('hidden', !show)
    this.showButtonTarget.classList.toggle('hidden', show)
  }

  // ✅ 「コメントを追加」ボタンでフォームを開く
  showForm() {
    this.toggleCommentForm(true)
  }
}

