import * as React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { fetchEventsStart, fetchEventsSuccess, fetchEventsFailure } from '../../store/slices/eventsSlice';

const mockEvents = [
  { id: '1', title: 'לילה מסתורי 1', date: '2025-05-10', location: 'תל אביב' },
  { id: '2', title: 'לילה מסתורי 2', date: '2025-06-02', location: 'ירושלים' },
  { id: '3', title: 'לילה מסתורי 3', date: '2025-07-15', location: 'חיפה' },
];

function EventItem({ title, date, location }: { title: string; date: string; location: string }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.meta}>{date} • {location}</Text>
    </View>
  );
}

export default function EventsScreen() {
  const dispatch = useAppDispatch();
  const { events, loading, error } = useAppSelector(state => state.events);

  React.useEffect(() => {
    dispatch(fetchEventsStart());
    setTimeout(() => {
      dispatch(fetchEventsSuccess(mockEvents));
    }, 800);
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>האירועים שלי</Text>
      {loading && <ActivityIndicator size="large" color="#6C47FF" style={{ marginVertical: 24 }} />}
      {error && <Text style={{ color: 'red', textAlign: 'center', marginVertical: 16 }}>{error}</Text>}
      {!loading && events.length === 0 && !error && (
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
