import { Box } from "@chakra-ui/core";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-react";

const CKEditorWrapper = (props: any) => {
  return (
    <Box>
      <CKEditor editor={ClassicEditor} {...props} />
    </Box>
  );
};

export default CKEditorWrapper;
