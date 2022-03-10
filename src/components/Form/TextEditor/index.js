import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import PropTypes from "prop-types";

export default function TextEditor(props) {
  const { onChange, name, value } = props;
  const editorRef = useRef(null);

  const onEditorChange = () => {
    const param = {
      target: {
        name,
        value: editorRef.current.getContent(),
      },
    };
    onChange(param);
  };
  return (
    <>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        // initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 390,
          menubar: true,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:12px }",
        }}
        value={value}
        tagName="textarea"
        textareaName={name}
        onEditorChange={onEditorChange}
      />
    </>
  );
}

TextEditor.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.string,
  
};
