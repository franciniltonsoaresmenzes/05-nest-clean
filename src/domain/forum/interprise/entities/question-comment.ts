import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Comment, CommentProps } from './comment'

export interface QuestionComentProps extends CommentProps {
  questionId: UniqueEntityID
}

export class QuestionComment extends Comment<QuestionComentProps> {
  get questionId() {
    return this.props.questionId
  }

  static create(
    props: Optional<QuestionComentProps, 'createdAd'>,
    id?: UniqueEntityID,
  ) {
    const questionComent = new QuestionComment(
      {
        ...props,
        createdAd: props.createdAd ?? new Date(),
      },
      id,
    )

    return questionComent
  }
}
