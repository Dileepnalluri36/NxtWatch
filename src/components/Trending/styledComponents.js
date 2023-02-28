import styled from 'styled-components'

export const TrendingContainer = styled.div`
  background-color: ${props => (props.isLight ? '#f9f9f9 ' : '#0f0f0f ')};
  padding-top: 0;
`

export const TrendingHeader = styled.div`
  background-color: ${props => (props.isLight ? '#d7dfe9 ' : '#231f20')};
  padding: 40px;
  margin-left: 0;
`

export const TrendingIconDiv = styled.div`
  background-color: ${props => (props.isLight ? '#cccccc ' : '#000 ')};
  padding: 20px;
  border-radius: 50%;
`

export const TrendingHeading = styled.h1`
  color: ${props => (props.isLight ? '#00306e' : '#fff')};
`
