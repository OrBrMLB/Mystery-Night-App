import * as React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useGetEventsQuery } from '../../store/api/eventsApi';

function EventItem({ title, date, location }: { title: string; date: string; location: string }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.meta}>{date} • {location}</Text>
    </View>
  );
}

export default function EventsScreen() {
  const { data: events = [], isLoading, error } = useGetEventsQuery();

  // Debug logging
  React.useEffect(() => {
    if (error) {
      console.error('Supabase events fetch error:', error);
    } else {
      console.log('Fetched events:', events);
    }
  }, [events, error]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>האירועים שלי</Text>
      {isLoading && <ActivityIndicator size="large" color="#6C47FF" style={{ marginVertical: 24 }} />}
      {error && <Text style={{ color: 'red', textAlign: 'center', marginVertical: 16 }}>{'שגיאה בטעינת אירועים'}</Text>}
      {!isLoading && events.length === 0 && !error && (
        <Text style={{ textAlign: 'center', color: '#888', marginTop: 32 }}>לא נמצאו אירועים</Text>
      )}
      <FlatList
        data={events}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <EventItem title={item.title} date={item.date} location={item.location} />
        )}
        contentContainerStyle={{ paddingBottom: 32 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16, paddingTop: 32 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: { backgroundColor: '#f5f5fa', borderRadius: 10, padding: 18, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 6, color: '#222' },
  meta: { fontSize: 14, color: '#555', textAlign: 'right' },
});
