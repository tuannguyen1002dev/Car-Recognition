import React, { Component, useEffect } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Alert from '@material-ui/lab/Alert'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import M8 from '../../assets/video/m8.mp4';
import { withStyles } from "@material-ui/core/styles";
import drawerWidth from './Home'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';


axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
// import CSRFToken from './csrftoken';
const useStyles = (theme) => ({
  mainRoot: {
    transitionDuration: 2000,
    opacity: 0,
    transition: theme.transitions.create(['opacity'],
      { duration: theme.transitions.duration.standard, }),
    '&:hover': { opacity: 1 }, ':before': { content: "Reply!" }
  },
  animatedItem: {
    opacity: 0,
    animationDelay: 3000,
    animation: `$myEffect 5000ms ${theme.transitions.easing.easeIn}`
  },
  animatedItemExiting: {
    // animation: `$myEffectExit 3000ms ${theme.transitions.easing.easeOut}`,
    opacity: 1,
  },
  "@keyframes myEffect": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    }
  },
  buttonMore: {
    opacity: 0,
    // animation: `$btnMore 3000ms ${theme.transitions.easing.easeIn}`
  },
  "@keyframes btnMore": {
    "0%": {
      opacity: 0,
      transform: "translateY(-200%)"
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)"
    }
  },
  buttonLess: {
    opacity: 1,
    animation: `$btnLess 3000ms ${theme.transitions.easing.easeOut}`
  },
  "@keyframes btnLess": {
    "0%": {
      opacity: 0,
      transform: "translateY(-50%)"
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)"
    }
  }
});

class SearchEngine extends Component {
  constructor() {
    super();
    this.state = {
      selectedFile: null,
      tempImg: null,
      animationDraw: false,
      searchDraw: false,
      overlay: null
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.searchDrawer = this.searchDrawer.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      selectedFile: event.target.files[0],
      tempImg: URL.createObjectURL(event.target.files[0])
    })
    let video = document.getElementById("video")
    let imageUpload = document.getElementById("imageUpload")
    // imageUpload == null ? video.muted = true : video.muted = false;
    let alert = document.getElementById("alert")
    alert.style.display = "block";
  }


  submit() {
    const data = new FormData()
    data.append('file', this.state.selectedFile, this.state.selectedFile.name)
    console.log(this.state.selectedFile);
    let url = "http://127.0.0.1:8000/save_file";
    axios.post(url, data, { // receive two parameter endpoint url ,form data 
    })
      .then(res => { // then print response status
        console.warn(res);
      })
  }
  componentDidMount() {

    // document.getElementById("video").play()
    setTimeout(() => {
      // this.setState({
      //   animationDraw: false
      // })
      this.setState({
        animationDraw: true
      })
    }, 8000)
    setInterval(() => {
      if (window.innerHeight == screen.height) {
        this.setState({
          overlay: document.getElementById("overlay").style.height = screen.height + 790
        });
      } else {
        this.setState({
          overlay: document.getElementById("overlay").style.height = screen.height + 650
        });
      }
    }, 50)

  }

  searchDrawer() {
    this.setState({
      searchDraw: true
    });
    let box = document.getElementById("input-box");
    box.disabled = false;
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid
        xs={12}
        style={{ paddingTop: "150px", minHeight: "100vh", color: "#fff", margin: 0 }}
      >
        <Grid className={clsx(classes.animatedItem, { [classes.animatedItemExiting]: this.state.animationDraw })} style={{ position: "relative" }} >
          <div id="overlay" style={{ backgroundColor: "#000", zIndex: "2", width: "100%", height: this.state.overlay, position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", opacity: "0.5" }}>
          </div>
          <Grid container justify="center" xs={12} style={{ zIndex: "9999", position: "absolute", width: "100%", left: "50%", top: "50%", transform: "translate(-50%, -50%)", marginTop: "380px" }}>
            <Typography style={{ pointerEvents: "none" }} id="title-text" xs={12} variant="h3" component="h3" gutterBottom>
              Car Recognition System
            </Typography>
            <Button style={{ color: "#fff" }} onClick={this.searchDrawer}>
              Press to search
            </Button>
            <Grid id="input-box" xs={12} className={clsx(classes.buttonMore, { [classes.buttonLess]: this.state.searchDraw })} disabled>
              <Grid container justify="center" xs={12} style={{ marginBottom: "50px", marginTop: "50px" }}>
                <h5 xs={4}>Select File : </h5>
                <input style={{ width: "185px" }} xs={4} id="uploadImage" type="file" id="bannerImg" name="file" onChange={this.handleInputChange} />
                <Button xs={4} type="submit" className="" onClick={() => this.submit()} variant="contained" color="primary" >
                  Upload
                </Button>
              </Grid>
            </Grid>
            <br />
          </Grid>
          <Grid container justify="center" xs={12} style={{ position: "relative" }} >
            <Alert variant="filled" id="alert" style={{ zIndex: "99999", position: "absolute", left: "50%", transform: "translate(-50%, -50%)", display: "none" }} severity="success">
              Upload success, scroll down to see upload image
            </Alert>
          </Grid>
        </Grid>
        <Grid containter style={{ marginTop: screen.height - 200 }} >
          <img src={this.state.tempImg} width="100%" id="ImgPreview" />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(useStyles)(SearchEngine);
