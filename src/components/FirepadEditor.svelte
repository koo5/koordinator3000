<script lang="js">

	import { onMount } from "svelte";
	import firebase from "@firebase/app";
	import "firebase/database";

	let firepad_container;

	onMount(() => {
		console.log("onMount");
		init();
	});

	function getExampleRef() {
		var ref = firebase.database().ref();
		var hash = window.location.hash.replace(/#/g, "");
		if (hash) {
			ref = ref.child(hash);
		} else {
			ref = ref.push(); // generate unique location.
			window.location = window.location + "#" + ref.key; // add it as a hash to the URL.
		}
		if (typeof console !== "undefined") {
			console.log("Firebase data: ", ref.toString());
		}
		return ref;
	}

	function init() {
		window.firebase = firebase;
		var firebase_config = {
			apiKey: "<API_KEY>",
			authDomain: "firepad-gh-tests.firebaseapp.com",
			databaseURL: "https://firepad-gh-tests.firebaseio.com"
		};
		firebase.initializeApp(firebase_config);

		//// Get Firebase Database reference.
		var firepadRef = getExampleRef();
		console.log(firepadRef);

		//// Create CodeMirror (with lineWrapping on).
		var codeMirror = window.CodeMirror(firepad_container, { lineWrapping: true, lineNumbers:true });

		//// Create Firepad (with rich text toolbar and shortcuts enabled).
		var firepad = window.Firepad.fromCodeMirror(firepadRef, codeMirror,
			{
				richTextToolbar: true,
				richTextShortcuts: true
			});
		console.log(firepad);

		//// Initialize contents.
		firepad.on("ready", function () {
				console.log("ready");
				if (firepad.isHistoryEmpty())
				{
					firepad.setHtml(
						"<span style=\"font-size: 24px;\">Rich-text editing with <span style=\"color: red\">Firepad!</span></span><br/>\n" +
						"<br/>" +
						"<div style=\"font-size: 18px\">" +
						"Supports:<br/>" +
						"<ul>" +
						"<li>Different " +
						"<span style=\"font-family: impact\">fonts,</span>" +
						"<span style=\"font-size: 24px;\"> sizes, </span>" +
						"<span style=\"color: blue\">and colors.</span>" +
						"</li>" +
						"<li>" +
						"<b>Bold, </b>" +
						"<i>italic, </i>" +
						"<u>and underline.</u>" +
						"</li>" +
						"<li>Lists" +
						"<ol>" +
						"<li>One</li>" +
						"<li>Two</li>" +
						"</ol>" +
						"</li>" +
						"<li>Undo / redo</li>" +
						"<li>Cursor / selection synchronization.</li>" +
						"<li><checkbox></checkbox> It supports customized entities.</li>" +
						"<li>And it's all fully collaborative!</li>" +
						"</ul>" +
						"</div>"
					);
				}
			}
		);

		// An example of a complex custom entity.
		firepad.registerEntity("checkbox", {
			render: function (info, entityHandler) {
				var inputElement = document.createElement("input");
				inputElement.setAttribute("type", "checkbox");
				if (info.checked) {
					inputElement.checked = "checked";
				}
				inputElement.addEventListener("click", function () {
					entityHandler.replace({ checked: this.checked });
				});
				return inputElement;
			}.bind(this),
			fromElement: function (element) {
				var info = {};
				if (element.hasAttribute("checked")) {
					info.checked = true;
				}
				return info;
			},
			update: function (info, element) {
				if (info.checked) {
					element.checked = "checked";
				} else {
					element.checked = null;
				}
			},
			export: function (info) {
				var inputElement = document.createElement("checkbox");
				if (info.checked) {
					inputElement.setAttribute("checked", true);
				}
				return inputElement;
			}
		});
	}


</script>

<style>
    #firepad-container {
      width: 100%;
      height: 500px;
    }
	:global(.powered-by-firepad) {
		display: none !important;
	}
</style>


<div id="firepad-container" bind:this={firepad_container}></div>

