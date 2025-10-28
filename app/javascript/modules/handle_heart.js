import $ from "jquery"
import axios from "../modules/axios"

export function likeArticle(articleId, handleHeartDisplay) {
  axios.post(`/api/articles/${articleId}/like.json`)
    .then((response) => {
      if (response.data.status === 'ok') {
        handleHeartDisplay(true)
      }
    })
    .catch((e) => {
      alert('Error')
      console.error(e)
    })
}

// いいね解除処理
export function unlikeArticle(articleId, handleHeartDisplay) {
  axios.delete(`/api/articles/${articleId}/like.json`)
    .then((response) => {
      if (response.data.status === 'ok') {
        handleHeartDisplay(false)
      }
    })
    .catch((e) => {
      alert('Error')
      console.error(e)
    })
}
