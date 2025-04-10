import fetchCharacters from "@/services/api";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";

interface Personagem {
    id: number;
    name: string;
    images: [string]
}

export default function Home() {
    const router = useRouter();
    const [personagens, setPersonagens] = useState<Personagem[]>([])
    const [carregar, setCarregar] = useState(true)

    const handlePress = (id: number) => {
        router.push(`/personagens`);
    };

    useEffect(() => {
        async function carregarPersonagem() {
            const dados = await fetchCharacters();
            setPersonagens(dados.characters);
        }
        carregarPersonagem();
    }, [])

    return (
        <View style={style.container} >
            <Text>Página de detalhes</Text>
            <FlatList
                data={personagens}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <View style={style.card}>
                        <TouchableOpacity onPress={() => handlePress(item.id)}>
                        <Image source={{uri:item.images[0]}} style={style.image}/>
                        </TouchableOpacity>
                        <Text style={style.name}>{item.name}</Text>
                    </View>
                )}
            />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF",
        padding: 15
    },

    card: {
        backgroundColor: "#F4F4F4",
        padding: 10,
        marginVertical: 8,
        borderRadius: 10,
        alignItems: "center"
    },

    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 5
    },

    name: {
        fontSize: 18,
        fontWeight: "bold"
    }
})