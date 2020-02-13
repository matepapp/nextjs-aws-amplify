import CKEditor from "@ckeditor/ckeditor5-react";
import { useEffect, useRef, useState } from "react";
import ClassicEditorBuild from "../../vendor/ckeditor5/build/classic-editor-with-track-changes";
import { TrackChangesAdapter } from "./track-changes-adapter";

const LICENSE_KEY = "XhNG7kj8sT1Mpj00/vq3fsdybx/W3LGH+Tnmi8lwB3ROigck3Hc+iSU=";

const initialData = `
	<h2>
		Bilingual Personality Disorder
	</h2>
	<figure class="image image-style-side">
		<img src="https://c.cksource.com/a/1/img/docs/sample-image-bilingual-personality-disorder.jpg">
		<figcaption>
			One language, one person.
		</figcaption>
	</figure>
	<p>
		This may be the first time you hear about this made-up disorder but it
		<suggestion id="suggestion-1:user-2" suggestion-type="insertion" type="start"></suggestion>actually<suggestion id="suggestion-1:user-2" suggestion-type="insertion" type="end"></suggestion>
		isn’t so far from the truth. Even the studies that were conducted almost half a century show
		that <strong>the language you speak has more effects on you than you realise</strong>.
	</p>
	<p>
		One of the very first experiments conducted on this topic dates back to 1964.
		<a href="https://www.researchgate.net/publication/9440038_Language_and_TAT_content_in_bilinguals">In the experiment</a>
		designed by linguist Ervin-Tripp who is an
		<suggestion id="suggestion-2:user-1" suggestion-type="deletion" type="start"></suggestion>
		authority<suggestion id="suggestion-2:user-1" suggestion-type="deletion" type="end">
		</suggestion>
		<suggestion id="suggestion-3:user-1" suggestion-type="insertion" type="start"></suggestion>
		expert<suggestion id="suggestion-3:user-1" suggestion-type="insertion" type="end"></suggestion>
		in psycholinguistic and sociolinguistic studies, adults who are bilingual
		in English in French were showed series of pictures and were asked to create 3-minute stories.
		In the end participants emphasized
		drastically different dynamics for stories in English and French.
	</p>
	<p>
		Another ground-breaking experiment which included bilingual Japanese women married to American men
		<suggestion id="suggestion-4:user-1" suggestion-type="deletion" type="start"></suggestion>in San
		Francisco <suggestion id="suggestion-4:user-1" suggestion-type="deletion" type="end">
		</suggestion>were
		asked to complete sentences. The goal of the experiment was to investigate whether or not human
		feelings and thoughts
		are expressed differently in <strong>different language mindsets</strong>.
	</p>
	<suggestion id="suggestion-6:user-2" suggestion-type="formatBlock:698dn3otqzd6" type="start"></suggestion>
	<p>
		Here is a sample from the the experiment:
		<suggestion id="suggestion-6:user-2" suggestion-type="formatBlock:698dn3otqzd6" type="end"></suggestion>
	</p>
	<table>
		<thead>
			<tr>
				<th></th>
				<th>English</th>
				<th>Japanese</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Real friends should</td>
				<td>Be very frank</td>
				<td>Help each other</td>
			</tr>
			<tr>
				<td>I will <suggestion id="suggestion-5:user-2" suggestion-type="formatInline:886cqig6g8rf" type="start"></suggestion>probably<suggestion id="suggestion-5:user-2" suggestion-type="formatInline:886cqig6g8rf" type="end"></suggestion> become</td>
				<td>A teacher</td>
				<td>A housewife</td>
			</tr>
			<tr>
				<td>When there is a conflict with family</td>
				<td>I do what I want</td>
				<td>It's a time of great unhappiness</td>
			</tr>
		</tbody>
	</table>
	<p>
		More recent <a href="https://books.google.pl/books?id=1LMhWGHGkRUC">studies</a> show, the
		language a person speaks affects
		their cognition, behaviour, emotions and hence <strong>their personality</strong>.
		This shouldn’t come as a surprise
		<a href="https://en.wikipedia.org/wiki/Lateralization_of_brain_function">since we already know</a>
		that different regions of the brain become more active depending on the person’s activity at hand.
		Since structure, information and especially <strong>the culture</strong> of languages varies
		substantially and the language a person speaks is an essential element of daily life.
	</p>
`;

const CKEditorWrapper = () => {
  const [editor, setEditor] = useState<null | any>(null);
  const [isLayoutReady, setLayoutReady] = useState<boolean>(false);
  const sideBarElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setLayoutReady(true);
  }, []);

  const refreshDisplayMode = () => {
    if (!editor) {
      return;
    }

    const annotations = editor.plugins.get("Annotations");
    const sidebarElement = sideBarElementRef.current;

    if (window.innerWidth < 1070) {
      sidebarElement.classList.remove("narrow");
      sidebarElement.classList.add("hidden");
      annotations.switchTo("inline");
    } else if (window.innerWidth < 1300) {
      sidebarElement.classList.remove("hidden");
      sidebarElement.classList.add("narrow");
      annotations.switchTo("narrowSidebar");
    } else {
      sidebarElement.classList.remove("hidden", "narrow");
      annotations.switchTo("wideSidebar");
    }
  };

  return (
    <div className="row row-editor">
      {isLayoutReady && (
        <CKEditor
          onInit={editor => {
            editor.execute("trackChanges");
            setEditor(editor);

            console.log("Editor is ready to use!", editor);
            refreshDisplayMode();
          }}
          onChange={(event, editor) => console.log({ event, editor })}
          editor={ClassicEditorBuild}
          config={{
            extraPlugins: [TrackChangesAdapter],
            sidebar: {
              container: sideBarElementRef.current
            },
            licenseKey: LICENSE_KEY
          }}
          data={initialData}
        />
      )}
      <div ref={sideBarElementRef} className="sidebar" />
    </div>
  );
};

export default CKEditorWrapper;
