import { AsyncStorage } from "react-native";
import { CARDS_STORAGE_KEY, NOTIFICATION_KEY } from "./Config";
import { Notifications, Permissions } from 'expo'

export function removeItem() {
    return AsyncStorage.removeItem(CARDS_STORAGE_KEY, (err) => console.log(err))
}

export function getDecks() {
    return AsyncStorage.getItem(CARDS_STORAGE_KEY, (err, result) => {
        console.log(result);
    })
        .then((data) =>{
            return JSON.parse(data)
        })
}

export function getDeck(id) {
    return AsyncStorage.getItem(CARDS_STORAGE_KEY, (err, result) => {
        console.log(result);
    })
        .then((data) => JSON.parse(data)[id])
}

export function saveDeckTitle(id) {
    return AsyncStorage.mergeItem(CARDS_STORAGE_KEY, JSON.stringify({
        [id] : {
            title: id,
            questions: []
        }
    }), () => {
        AsyncStorage.getItem(CARDS_STORAGE_KEY, (err, result) => {
            console.log(result)
        })
    })
}

export function addCardToDeck(id, entry) {
    console.log(id, entry)
    return AsyncStorage.getItem(CARDS_STORAGE_KEY, (err, result) => {
        AsyncStorage.mergeItem(CARDS_STORAGE_KEY, JSON.stringify({
            [id]: {
                questions: JSON.parse(result)[id].questions.concat(entry)
            }
        }), () => {
            AsyncStorage.getItem(CARDS_STORAGE_KEY, (err, result) => {
                console.log(JSON.parse(result))
            })
        })
    })

}

// 通知
export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
    return {
        title: '问答挑战',
        body: "👋 别忘记完成问答挑战",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()
                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(20)
                            tomorrow.setMintutes(0)
                            Notifications.scheduleLocalNotificationsAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day',
                                }
                            )

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }

        })
}

