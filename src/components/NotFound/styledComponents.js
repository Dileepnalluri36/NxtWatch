import styled from 'styled-components'

export const NotFoundContainer = styled.div`
  background-color: ${props => (props.isLight ? '#f9f9f9 ' : '#0f0f0f ')};
  padding-top: 0;
  color: ${props => (props.isLight ? '#00306e ' : '#fff ')};
`
