import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Comment, CommentProps } from './comment'

export interface AnswerCommentProps extends CommentProps {
  answerId: UniqueEntityID
}

export class AnswerComment extends Comment<AnswerCommentProps> {
  get answerId() {
    return this.props.answerId
  }

  static create(
    props: Optional<AnswerCommentProps, 'createdAd'>,
    id?: UniqueEntityID,
  ) {
    const answerComent = new AnswerComment(
      {
        ...props,
        createdAd: props.createdAd ?? new Date(),
      },
      id,
    )

    return answerComent
  }
}
