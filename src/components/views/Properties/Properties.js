import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropertiesTable from './PropertiesTable';
import './Properties';
import {getProperties} from '../../../redux/ducks/propertyReducer';

class Properties extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getProperties();
  }

  render() {
    console.log(this.props);
    const properties =
      this.props.properties[0] &&
      this.props.properties.map(property => (
        <div>
          <div>{property.name}</div>
          <div>{property.address}</div>
          <div>{property.units}</div>
          <div>{property.value}</div>
          <div>{property.expenses}</div>
        </div>
      ));
    console.log(this.props.properties);

    return (
      <div className="Properties">
        <div className="Properties__form" />
        {properties}
        <Link className="" to="/owner/properties/new">
          Add Property
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.propertyReducer,
});

export default connect(mapStateToProps, {getProperties})(Properties);