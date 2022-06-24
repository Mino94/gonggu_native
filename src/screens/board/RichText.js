import React from "react";
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from "react-native"
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { SafeAreaView } from "react-native-safe-area-context";


const RichText = () => {
	const richText = React.useRef();
	return (
		<SafeAreaView>
            <ScrollView>
				<RichToolbar
					style={styles.richTextToolbar}
					iconTint="#F7F4E3"
					editor={richText}
					actions={[ actions.setBold, actions.setItalic, actions.setUnderline, actions.setStrikethrough, actions.insertBulletsList, actions.heading1 ]}
					iconMap={{ [actions.heading1]: ({tintColor}) => (<Text style={[{color: tintColor}]}>H1</Text>), }}
				/>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}	style={{ flex: 1 }}>
                    <RichEditor
						style={styles.richTextEditor}
                        ref={richText}
                        onChange={ descriptionText => {
                            console.log("descriptionText:", descriptionText);
                        }}
						useContainer={false}
						containerStyle={{ minHeight: 200 }}
                    />
                </KeyboardAvoidingView>
            </ScrollView>
		</SafeAreaView>
		)
}

const styles = StyleSheet.create({
	richTextToolbar: {
		backgroundColor: "#34532d",
		marginTop: 5
	},
	richTextEditor: {
		borderWidth: 1,
		marginBottom: 5
	}
});

export default RichText;
