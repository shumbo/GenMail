import React from "react";
import styled from "@emotion/styled";
import { useColorMode } from "@chakra-ui/react";
import ExampleTheme from "./themes/ExampleTheme";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
// import TreeViewPlugin from "./plugins/TreeViewPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";

import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import StyledEditor from "./StyleEditor";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";

function Placeholder() {
  return <div className="editor-placeholder">Paste your text here...</div>;
}

const editorConfig = {
  // The editor theme
  theme: ExampleTheme,
  // Handling of errors during update
  // onError(error: any) {
  //   throw error;
  // },
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
};

export default function Editor() {
  // const onChange = (e) => {
  //   const words = countWords(e.target.value);
  //   console.log(words);
  // };

  const { colorMode } = useColorMode();

  return (
    <StyledEditor theme={colorMode}>
      <LexicalComposer initialConfig={editorConfig}>
        <div className="editor-container">
          <ToolbarPlugin />
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={<Placeholder />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            {/* <OnChangePlugin onChange={onChange} /> */}
            <HistoryPlugin />
            {/* <AutoFocusPlugin /> */}
            <ListPlugin />
            <LinkPlugin />
            <AutoLinkPlugin />
          </div>
        </div>
      </LexicalComposer>
    </StyledEditor>
    // <LexicalComposer initialConfig={initialConfig}>
    //   <div className="editor-container">
    //     {/* <ToolbarPlugin /> */}
    //     <div className="editor-inner">
    //       <RichTextPlugin
    //         contentEditable={<ContentEditable className="editor-input" />}
    //         placeholder={<Placeholder />}
    //         ErrorBoundary={LexicalErrorBoundary}
    //       />
    //       <HistoryPlugin />
    //       {/* <TreeViewPlugin /> */}
    //       <AutoFocusPlugin />
    //       {/* <CodeHighlightPlugin /> */}
    //       <ListPlugin />
    //       <LinkPlugin />
    //       {/* <AutoLinkPlugin /> */}
    //       {/* <ListMaxIndentLevelPlugin maxDepth={7} /> */}
    //       <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
    //     </div>
    //   </div>
    // </LexicalComposer>
  );
}

const StyledEditorContainer = styled("div")`
  margin: 0px auto 0px auto;
  /* border-radius: 2px; */
  max-width: 500px;
  color: #000;
  position: relative;
  line-height: 20px;
  font-weight: 400;
  text-align: left;
  /* border-top-left-radius: 10px; */
  /* border-top-right-radius: 10px; */
  /* border-top: 1px solid #e2e8f0; */
  /* border-right: 1px solid gray; */
  /* border-bottom: 1px solid #e2e8f0; */
`;

const StyledEditorInner = styled("div")`
  background: #fff;
  position: relative;
  /* border-right: 1px solid gray; */
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
  min-height: 75vh;
`;
