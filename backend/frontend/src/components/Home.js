import React from "react";

class Home extends React.Component {

  render() {
    return (
      <main>
        <div className="wrapperFileUpload">
          <input type="file" className="btn" accept="image/x-png,image/gif,image/jpeg" />
          <span><button className="btn btn-primary">
            Upload
          </button></span>
        </div>
      </main >
    );
  }
};

export default Home;