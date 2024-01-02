import {StyleSheet, Text, View} from "react-native";
import {fs_15_700, text_red} from "../../assets/style.ts";

export default function InformationBox({listText, headerTitle, hasDot, textStyle }: any) {
    return (
        <View style={styles.wrapper}>
            <Text style={[fs_15_700, text_red]}>{headerTitle}</Text>
            <View style={styles.content}>
                {listText && listText.length > 0 && listText.map((item: any, index: number) => {
                    return (
                        <Text style={textStyle} key={index}>
                            {
                                hasDot ? '• '  : null
                            }
                            {
                                item
                            }
                        </Text>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        gap: 5,
    },
    content: {
        paddingLeft: 10,
        gap: 2,
    }
});