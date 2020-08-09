import React from 'react';
import Header from './components/Header';
import Search from './components/Search';
import Chart from './components/Chart';
import CourseSemesterData from './courseSemesterData';
import './App.css';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      course: "",
      professor: "",
      semester: "",
      totalData: null,
      semesterData: null,
    };
  }

  getData = (course, professor, semester) => {
    var myHeaders = new Headers();
    myHeaders.append("X-Requested-With", "true");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch(`https://cors-anywhere.herokuapp.com/https://api.planetterp.com/v1/grades?course=${course}&professor=${professor}`, requestOptions)
        .then(response => response.json())
        .then(result => this.setState({
          totalData: result,
          semesterData: this.combineSectionData(result, semester),
        }))
        .catch(error => console.log('error', error));
  }

  combineSectionData = (totalData, semester) => {
    const semesterData = totalData.filter(datum => datum.semester === semester);
    let combinedData = semesterData.reduce((a, x) => {
      a['A+'] += x['A+'];
      a['A'] += x['A'];
      a['A-'] += x['A-'];
      a['B+'] += x['B+'];
      a['B'] += x['B'];
      a['B-'] += x['B-'];
      a['C+'] += x['C+'];
      a['C'] += x['C'];
      a['C-'] += x['C-'];
      a['D+'] += x['D+'];
      a['D'] += x['D'];
      a['D-'] += x['D-'];
      a['F'] += x['F'];
      a['W'] += x['W'];
      a['Other'] += x['Other'];
      return a;
    }, new CourseSemesterData());
    combinedData['course'] = semesterData[0].course;
    combinedData['professor'] = semesterData[0].professor;
    combinedData['semester'] = semesterData[0].semester;
    return combinedData;
  }

  searchCallBack = (course, professor, semester) => {
    this.setState({
      course,
      professor,
      semester,
    });
    this.getData(course, professor, semester);
  }

  semesterCallBack = (semester) => {
    console.log(semester);
    this.setState({
      semester,
      semesterData: this.combineSectionData(this.state.totalData),
    });
  }

  render() {
    return (
      <div>
        <Header/>
        <Search searchCallBack={this.searchCallBack} course={this.state.course} professor={this.state.professor} semester={this.state.semester}/>
        <Chart data={this.state.semesterData}/>
      </div>
    );
  }
}
export default App;
