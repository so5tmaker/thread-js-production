import {
  ApiPath,
  CommentsApiPath,
  HttpMethod,
  ContentType
} from 'common/enums/enums';

class Comment {
  constructor({ apiPath, http }) {
    this._apiPath = apiPath;
    this._http = http;
  }

  getAllComments(filter) {
    return this._http.load(`${this._apiPath}${ApiPath.COMMENTS}`, {
      method: HttpMethod.GET,
      query: filter
    });
  }

  getComment(id) {
    return this._http.load(
      `${this._apiPath}${ApiPath.COMMENTS}${CommentsApiPath.ROOT}${id}`,
      {
        method: HttpMethod.GET
      }
    );
  }

  addComment(payload) {
    return this._http.load(`${this._apiPath}${ApiPath.COMMENTS}`, {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload)
    });
  }

  updateComment(payload) {
    const { id } = payload;
    return this._http.load(
      `${this._apiPath}${ApiPath.COMMENTS}${CommentsApiPath.ROOT}${id}`,
      {
        method: HttpMethod.PUT,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload)
      }
    );
  }

  deleteComment(id) {
    return this._http.load(
      `${this._apiPath}${ApiPath.COMMENTS}${CommentsApiPath.ROOT}${id}`,
      {
        method: HttpMethod.DELETE
      }
    );
  }

  likeComment(commentId, isLike) {
    return this._http.load(
      `${this._apiPath}${ApiPath.COMMENTS}${CommentsApiPath.REACT}`,
      {
        method: HttpMethod.PUT,
        contentType: ContentType.JSON,
        payload: JSON.stringify({
          commentId,
          isLike
        })
      }
    );
  }
}

export { Comment };
