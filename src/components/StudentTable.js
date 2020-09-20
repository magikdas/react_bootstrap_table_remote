import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import axios from 'axios';

const { SearchBar, ClearSearchButton } = Search;

const selectRow = {
  mode: 'checkbox',
  clickToSelect: true,
  style: { backgroundColor: '#D3D3D3', color: '#fff' }
};

const defaultSorted = [{
  dataField: 'name',
  order: 'desc'
}];

const MyExportCSV = (props) => {
  const handleExportCSVClick = () => {
    props.onExport();
  };
  return (
    <div>
      <button className="btn btn-success" onClick={handleExportCSVClick}>Export to CSV</button>
    </div>
  );
};

class StudentTable extends Component {



  state = {
    employee: [],
    columns: [{
      dataField: '_id',
      text: 'Id',
      editable: false,
      headerStyle: () => {
        return { width: "300px" };
      }
    },
    {
      dataField: 'first_name',
      text: 'First Name',
      sort: true,
      editable: false,
      headerStyle: () => {
        return { width: "200px" };
      }
    },
    {
      dataField: 'last_name',
      text: 'Last Name',
      sort: true,
      editable: false,
      headerStyle: () => {
        return { width: "200px" };
      }
    },
    {
      dataField: 'mobile',
      text: 'Mobile',
      sort: true,
      editable: false,
      headerStyle: () => {
        return { width: "200px" };
      }
    },
    {
      dataField: 'gender',
      text: 'Gender',
      sort: true,
      editable: false,
      headerStyle: () => {
        return { width: "100px" };
      }
    },
    {
      dataField: 'dob',
      text: 'Date of Birth',
      sort: true,
      editable: false,
      headerStyle: () => {
        return { width: "250px" };
      },
    }
    ]
  }

  componentDidMount() {
    axios.get('http://ec2-52-66-251-205.ap-south-1.compute.amazonaws.com:5000/api/v1/student').then(response => {
      console.log(response.data);
      this.setState({
        employee: response.data
      });
    });
  }
  render() {
    return (
      <div className="container">
        <div style={{ marginTop: 10 }}>

          <ToolkitProvider
            keyField="id"
            data={this.state.employee}
            columns={this.state.columns}
            search
            exportCSV
          >
            {
              props => (
                <div>
                  <SearchBar {...props.searchProps} />
                  <ClearSearchButton {...props.searchProps} />
                  <BootstrapTable
                    {...props.baseProps}
                    bootstrap4
                    keyField="_id"
                    data={this.state.employee}
                    columns={this.state.columns}
                    selectRow={selectRow}
                    defaultSorted={defaultSorted}
                    noDataIndication={'no results found'}
                    pagination={paginationFactory()}
                    striped
                    hover
                  />
                  <hr />
                  <MyExportCSV {...props.csvProps} />
                </div>
              )
            }
          </ToolkitProvider>
        </div>
      </div>

    )
  }
}

export default StudentTable  
