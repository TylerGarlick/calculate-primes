import React from 'react'
import { compose, withState, withHandlers } from 'recompose'
import Styled from 'styled-components'
import IsPrime from 'quick-is-prime'


const Form = Styled.form`
  font-size: 16px;
`

const FieldGroup = Styled.div`
  padding: 5px;
  margin: 5px;
`
const NumberInput = Styled.input`
  font-size: 14px;
  padding: 5px;
  border: 1px solid black;
`
const Label = Styled.label`
  display: block;
  font-size: 110%
`

const Button = Styled.button`
  border: 1px solid black;
  background: red;
  color: white;
  padding: 5px 15px;
  font-size: 115%;
`

const isEven = value => (value % 2 === 0) ? 'Even' : 'Odd'

const isPrime = value => IsPrime(value) ? 'Prime' : 'Not Prime'

const enhance = compose(
  withState('number', 'setNumber', 0),
  withState('message', 'setMessage', ''),
  withHandlers({
    onSubmitted: props => e => {
      e.preventDefault()
      const { number, setMessage } = props

      const message = `${isEven(number)} ${isPrime(number)}`
      // const message = isEven(number) + ' ' + isPrime(number)
      setMessage(message)
    },
  }),
)

// this.setState({number: e.target.value, message: ''})

export default enhance(({ number, setNumber, onSubmitted, message }) => (
  <Form onSubmit={onSubmitted}>
    <FieldGroup>
      <Label labelFor="number">Number</Label>
      <NumberInput type="number" id="number" value={number} onChange={e => setNumber(e.target.value)} />
    </FieldGroup>
    <FieldGroup>
      <Button type="submit">Calculate</Button>
    </FieldGroup>
    { message && <FieldGroup>{message}</FieldGroup> }
  </Form>
))

// const Component = (props) => (
//   <Form onSubmit={props.onSubmitted}>
//     <FieldGroup>
//       <Label labelFor="number">Number</Label>
//       <NumberInput type="number" id="number" value={props.number} onChange={e => props.setNumber(e.target.value)} />
//     </FieldGroup>
//     <FieldGroup>
//       <Button type="submit">Calculate</Button>
//     </FieldGroup>
//     {props.message && <FieldGroup>{props.message}</FieldGroup>}
//   </Form>
// )
//
// export default enhance(Component)
