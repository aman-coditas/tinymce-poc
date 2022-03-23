import React from "react";
import { Editor } from '@tinymce/tinymce-react';
import "./styles/styles.scss";

class App extends React.Component {
    state = {
        content: '<p>This is the initial content of the editor.</p>'
    }

    handleEditorChange = (content) => {
        console.log('Content was updated: ', content);
        this.setState({ content });
    }

    render() {
        const { content } = this.state;
        return (
            <div className="wrapper" >
                <Editor
                    apiKey='s0r5d5wnao19y838tfmk8agq3lyhapacnwvoak6pu45vwwd2'
                    value={content}
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist link autolink lists image imagetools charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen insertdatetime media table paste',
                            'code help wordcount media toc table textcolor'
                        ],
                        toolbar: 'undo redo | styleselect | forecolor backcolor | bullist numlist | outdent indent |' +
                            'link | table | image media | code | removeformat | toc help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                    onEditorChange={this.handleEditorChange}
                />
            </div>
        )
    }
}

export default App;
