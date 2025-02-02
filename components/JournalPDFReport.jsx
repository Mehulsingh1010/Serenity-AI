import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
    fontFamily: "Helvetica",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#8B5CF6",
    fontFamily: "Helvetica",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#6D28D9",
    fontFamily: "Helvetica",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    fontFamily: "Helvetica",
  },
  content: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12,
    lineHeight: 1.5,
    fontFamily: "Helvetica",
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 5,
    fontFamily: "Helvetica",
  },
  emotionTag: {
    backgroundColor: "#F3E8FF",
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  topicTag: {
    backgroundColor: "#E0E7FF",
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
    fontSize: 10,
    fontFamily: "Helvetica",
  },
})

const JournalPDFReport = ({ journal }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>{journal.title}</Text>
        <Text style={styles.text}>Date: {new Date(journal.createdAt).toLocaleDateString()}</Text>
        <Text style={styles.text}>Mood Score: {journal.moodScore}/10</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Journal Entry</Text>
        <Text style={styles.content}>{journal.content}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Analysis</Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Summary:</Text> {journal.analysis.summary}
        </Text>

        <Text style={styles.label}>Emotions:</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 10 }}>
          {[journal.analysis.emotions.primary, ...journal.analysis.emotions.secondary].map((emotion, index) => (
            <Text key={index} style={styles.emotionTag}>
              {emotion}
            </Text>
          ))}
        </View>

        <Text style={styles.label}>Topics:</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 10 }}>
          {journal.analysis.topics.map((topic, index) => (
            <Text key={index} style={styles.topicTag}>
              {topic}
            </Text>
          ))}
        </View>

        <Text style={styles.label}>Suggestions:</Text>
        <Text style={styles.text}>Immediate: {journal.analysis.suggestions.immediate}</Text>
        <Text style={styles.text}>Long-term: {journal.analysis.suggestions.longTerm}</Text>

        <Text style={styles.label}>Recommended Activities:</Text>
        {journal.analysis.suggestions.activities.map((activity, index) => (
          <Text key={index} style={styles.text}>
            • {activity}
          </Text>
        ))}

        <Text style={styles.label}>Helpful Resources:</Text>
        {journal.analysis.suggestions.resources.map((resource, index) => (
          <Text key={index} style={styles.text}>
            • {resource}
          </Text>
        ))}
      </View>
    </Page>
  </Document>
)

export default JournalPDFReport

