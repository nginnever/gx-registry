import React from 'react'
import ReactDOM from 'react-dom'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {hashHistory, Link} from 'react-router'

export const List = React.createClass({
  mixins: [PureRenderMixin],
  getInitialState: function() {
    return ({
      searchItem: false,
      list: []
    })
  },
  componentDidMount: function() {
    var packList = []
    this.props.api.init()
    this.props.api.iterate().then((list) => {
      this.setState({
        list: list
      })
    })
  },
  render: function() {
    var rows = []
    console.log(this.state.list)
    this.state.list.forEach((elem, index) => {
      const url = "http://ipfs.io/ipfs/" + elem.hash
      rows.push(          
        <tr key={index}>
            <td>{elem.name}</td>
            <td><a href={url}>{elem.hash}</a></td>
        </tr>)
    })
    return (
      <div>
        <div className="nav">
          <p>
            <Link to={'/'}>Search   </Link>
            -
            <Link to={'/publish'}>   Publish   </Link>
            -
            <Link to={'/list'}>   List</Link>
          </p>
        </div>
        <div className="home">
        <table className="border">
            <thead>
              <tr>
                <th>Package Name</th>
                <th>IPFS hash</th>
              </tr>
            </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
        </div>
        <br/>
        <br/>
        <div className="logoText">
          <h1>ippm registry</h1>
          <div className="logo">
            <a href="https://github.com/nginnever/ippm-registry">
              <img src={'Octicons-mark-github.svg.png'} style={{height: 50}} />
            </a>
          </div>
        </div>
      </div>
    )
  }
})

function mapStateToProps(state) {
  console.log(state.toJSON())
  return state.toJSON()
}

export const ListContainer = connect(mapStateToProps)(List)