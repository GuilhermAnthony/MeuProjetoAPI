import fetchCharacters from "@/services/api";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";