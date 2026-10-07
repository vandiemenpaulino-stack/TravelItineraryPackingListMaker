import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const categories = [
  { name: 'Transportation' },
  { name: 'Accommodation' },
  { name: 'Food' },
  { name: 'Activities' },
];

export default function Budget() {
  const [totalBudget, setTotalBudget] = useState('');
  const [expenses, setExpenses] = useState({
    Transportation: '',
    Accommodation: '',
    Food: '',
    Activities: '',
  });

  const updateExpense = (category, value) => {
    setExpenses({
      ...expenses,
      [category]: value,
    });
  };

  const budget = parseFloat(totalBudget) || 0;

  const totalSpent = Object.values(expenses).reduce(
    (total, value) => total + (parseFloat(value) || 0),
    0
  );

  const remaining = budget - totalSpent;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Budget</Text>
        <Text style={styles.subtitle}>
          Keep track of your travel expenses
        </Text>
      </View>

      <View style={styles.budgetSection}>
        <Text style={styles.sectionTitle}>Total Travel Budget</Text>

        <View style={styles.budgetInputContainer}>
          <Text style={styles.currency}>₱</Text>

          <TextInput
            style={styles.budgetInput}
            placeholder="Enter your budget"
            placeholderTextColor="#8A9A94"
            keyboardType="numeric"
            value={totalBudget}
            onChangeText={setTotalBudget}
          />
        </View>
      </View>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>TOTAL BUDGET</Text>
          <Text style={styles.summaryValue}>
            ₱{budget.toLocaleString()}
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>SPENT</Text>
          <Text style={styles.spentValue}>
            ₱{totalSpent.toLocaleString()}
          </Text>
        </View>

        <View style={styles.remainingCard}>
          <Text style={styles.summaryLabel}>REMAINING</Text>
          <Text
            style={[
              styles.remainingValue,
              remaining < 0 && styles.overBudget,
            ]}
          >
            ₱{remaining.toLocaleString()}
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Expenses</Text>

      <View style={styles.expensesContainer}>
        {categories.map((category) => (
          <View style={styles.expenseCard} key={category.name}>
            <View style={styles.expenseTitleContainer}>
              <Text style={styles.expenseIcon}>
                {category.icon}
              </Text>

              <Text style={styles.expenseName}>
                {category.name}
              </Text>
            </View>

            <View style={styles.expenseInputContainer}>
              <Text style={styles.currencySmall}>₱</Text>

              <TextInput
                style={styles.expenseInput}
                placeholder="0"
                placeholderTextColor="#8A9A94"
                keyboardType="numeric"
                value={expenses[category.name]}
                onChangeText={(value) =>
                  updateExpense(category.name, value)
                }
              />
            </View>
          </View>
        ))}
      </View>

      <View style={styles.progressCard}>
        <Text style={styles.progressTitle}>Budget Usage</Text>

        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${Math.min(
                  budget > 0 ? (totalSpent / budget) * 100 : 0,
                  100
                )}%`,
              },
            ]}
          />
        </View>

        <Text style={styles.progressText}>
          {budget > 0
            ? `${Math.round((totalSpent / budget) * 100)}% of your budget used`
            : 'Enter a budget to see your spending progress'}
        </Text>
      </View>

      <View style={styles.tipCard}>
        <Text style={styles.tipTitle}>Budget Tip</Text>
        <Text style={styles.tipText}>
          Set aside some money for unexpected expenses during your
          trip. A little extra budget can make your travel less
          stressful.
        </Text>
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9E8',
  },

  header: {
    backgroundColor: '#159A68',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 29,
    fontWeight: 'bold',
  },

  subtitle: {
    color: '#E8FFF5',
    fontSize: 15,
    marginTop: 5,
  },

  budgetSection: {
    margin: 20,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#173B35',
    marginHorizontal: 20,
    marginTop: 22,
    marginBottom: 12,
  },

  budgetInputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#D9E5DF',
  },

  currency: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#159A68',
  },

  budgetInput: {
    flex: 1,
    padding: 17,
    fontSize: 18,
  },

  summaryContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    gap: 8,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 16,
  },

  remainingCard: {
    flex: 1,
    backgroundColor: '#FFD447',
    padding: 14,
    borderRadius: 16,
  },

  summaryLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#65756F',
  },

  summaryValue: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#159A68',
    marginTop: 5,
  },

  spentValue: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FF6F61',
    marginTop: 5,
  },

  remainingValue: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#173B35',
    marginTop: 5,
  },

  overBudget: {
    color: '#D93025',
  },

  expensesContainer: {
    marginHorizontal: 20,
  },

  expenseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  expenseTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  expenseIcon: {
    fontSize: 25,
  },

  expenseName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#173B35',
    marginLeft: 10,
  },

  expenseInputContainer: {
    width: 105,
    backgroundColor: '#FFF9E8',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },

  currencySmall: {
    color: '#159A68',
    fontWeight: 'bold',
  },

  expenseInput: {
    flex: 1,
    padding: 10,
    textAlign: 'right',
  },

  progressCard: {
    backgroundColor: '#20C7C7',
    margin: 20,
    padding: 20,
    borderRadius: 20,
  },

  progressTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 14,
  },

  progressBackground: {
    height: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    overflow: 'hidden',
  },

  progressBar: {
    height: '100%',
    backgroundColor: '#FF6F61',
    borderRadius: 10,
  },

  progressText: {
    color: '#FFFFFF',
    marginTop: 10,
    fontSize: 13,
  },

  tipCard: {
    backgroundColor: '#FFD447',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
  },

  tipTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#173B35',
  },

  tipText: {
    color: '#173B35',
    marginTop: 7,
    lineHeight: 21,
  },
});