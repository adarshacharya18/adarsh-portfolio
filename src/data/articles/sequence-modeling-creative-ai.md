# Melodic Sequence Generation: Deep LSTMs vs. Probabilistic Markov Chains in Generative Music AI

Generative musical systems must balance two distinct structural forces: **global thematic coherence** (recurring motifs, musical phrases, and harmonic progressions) and **local note transitions** (melodic smoothness, appropriate step intervals, and avoiding sudden dissonant leaps).

In this article, we analyze the algorithmic trade-offs between deep sequence models and classical probabilistic models, drawing from the experimental configurations in the `ICTIS-2023` study. We compare **Long Short-Term Memory (LSTM) Networks** against **First-Order Markov Chains**, detailing data preprocessing steps, sequence mapping, transition probabilities, and how these models apply to different musical styles—specifically Western Classical Piano works and Indian Classical Ragas.

---

## Symbolic Music Representation and Preprocessing

Before feeding musical data into a generative model, we must parse symbolic audio files into structured digital representations. The preprocessing workflow differs drastically based on the musical style and file format:

```
[Western Classical (.krn)] ---------> Parse pitches/rests/chords -------> Pitch Token Dictionary (Tokens)
[Indian Classical (.mid)] ----------> Extract scale swaras/intervals ----> Monophonic Midi Sequences
```

### 1. Western Classical Piano (Kern Format)

Western classical music, particularly piano compositions, contains polyphonic structures (multiple notes/chords playing simultaneously) and strict time signatures.

- **Format:** Kern (`.krn`) format from the Humdrum toolkit is ideal because it serializes musical parameters into clear text columns.
- **Preprocessing:** We parse the Kern files, extracting pitches, chords, rests, and note durations. Chords are mapped to unique token identifiers, and durations are quantized (e.g., sixteenth notes).
- **Output:** A serialized sequence of token IDs representing the performance:
  `['C4', 'E4', 'G4', 'C4-E4-G4', 'REST', 'D4', 'F4', 'A4']`

### 2. Indian Classical Ragas (MIDI Format)

Indian Classical Music is predominantly monophonic, focusing on intricate melodic movements (_swaras_) and improvisations within a strict scale (_raga_).

- **Format:** MIDI files capture the continuous pitch-bending (_meend_) and ornamentations characteristic of ragas.
- **Preprocessing:** We extract note-on events, ignore absolute tempo variations, and map frequencies to the relative scale degrees of the raga (e.g., Sa, Re, Ga, Ma, Pa, Dha, Ni).
- **Output:** A single-track numeric stream of MIDI note numbers filtered to contain only notes within the specific raga scale.

---

## Model 1: First-Order Markov Chains

A First-Order Markov Chain is a probabilistic model where the probability of the next state (note) depends solely on the current state.

### Mathematical Formulation

The fundamental Markov property is expressed as:
$$P(X_t \mid X_1, \dots, X_{t-1}) = P(X_t \mid X_{t-1})$$

To generate a melody, we sample iteratively using a transition probability matrix $P$, starting from an initial distribution $P_0(X)$:
$$X_1 \sim P_0(X), \quad X_t \sim P(X_t \mid X_{t-1})$$

### Python Implementation

Here is a complete script demonstrating how to calculate a transition matrix from a sequence of notes and sample a new melody:

```python
import numpy as np

class MarkovMelodyGenerator:
    def __init__(self):
        self.transitions = {}
        self.states = []
        self.transition_matrix = None
        self.state_to_idx = {}
        self.idx_to_state = {}

    def fit(self, note_sequence):
        # Identify unique notes/states
        self.states = sorted(list(set(note_sequence)))
        self.state_to_idx = {state: idx for idx, state in enumerate(self.states)}
        self.idx_to_state = {idx: state for idx, state in enumerate(self.states)}

        num_states = len(self.states)
        # Initialize transition matrix count
        counts = np.zeros((num_states, num_states))

        # Count transitions
        for i in range(len(note_sequence) - 1):
            curr_state = note_sequence[i]
            next_state = note_sequence[i+1]
            curr_idx = self.state_to_idx[curr_state]
            next_idx = self.state_to_idx[next_state]
            counts[curr_idx, next_idx] += 1

        # Normalize rows to form transition probabilities
        row_sums = counts.sum(axis=1, keepdims=True)
        # Handle states with zero outgoing transitions to prevent divide-by-zero
        self.transition_matrix = np.where(row_sums > 0, counts / row_sums, 1.0 / num_states)

    def generate(self, start_note, length=32):
        if start_note not in self.state_to_idx:
            raise ValueError(f"Starting note '{start_note}' not found in training corpus.")

        current_idx = self.state_to_idx[start_note]
        melody = [start_note]

        for _ in range(length - 1):
            probabilities = self.transition_matrix[current_idx]
            next_idx = np.random.choice(len(self.states), p=probabilities)
            melody.append(self.idx_to_state[next_idx])
            current_idx = next_idx

        return melody

# Example Usage:
rag_bhairav = ['C4', 'Db4', 'E4', 'F4', 'G4', 'Ab4', 'B4', 'C5', 'B4', 'Ab4', 'G4', 'F4', 'E4', 'Db4', 'C4']
generator = MarkovMelodyGenerator()
generator.fit(rag_bhairav)
new_melody = generator.generate('C4', length=12)
print("Generated Raga Sequence:", new_melody)
```

### Musical Performance

- **Strengths:** Excellent for improvisational systems. It enforces local rules (scale constraints) and runs instantaneously. Training requires only counting transitions, meaning it can run on tiny datasets of a single raga performance.
- **Weaknesses:** Complete lack of memory. The model cannot maintain key center themes or repeat musical motifs, leading to rapid thematic drift (random walk).

---

## Model 2: Long Short-Term Memory (LSTM) Networks

An LSTM is a recurrent neural network (RNN) architecture designed to capture long-term dependencies in sequential data by utilizing a cell state ($C_t$) governed by three gates: forget, input, and output.

### Mathematical Formulation

The LSTM processes input sequences of length $L$ to predict the next note probability distribution:
$$y = f(x_t, x_{t-1}, \dots, x_{t-L})$$

### Python Implementation (TensorFlow/Keras)

Here is the core architecture of an LSTM-based melodic sequence composer:

```python
import tensorflow as tf
from tensorflow.keras import layers, models

def build_lstm_melody_generator(vocab_size, sequence_length, embedding_dim=64):
    """
    Builds a recurrent LSTM neural network for predicting the next note in a sequence.
    """
    model = models.Sequential([
        # Project sparse token IDs into dense vectors
        layers.Embedding(input_dim=vocab_size, output_dim=embedding_dim, input_length=sequence_length),

        # First LSTM layer returns sequences for the next LSTM layer
        layers.LSTM(128, return_sequences=True),
        layers.Dropout(0.2),

        # Second LSTM layer captures deeper temporal relations
        layers.LSTM(128),
        layers.Dropout(0.2),

        # Output layer produces logit probabilities for each note in the vocabulary
        layers.Dense(vocab_size, activation='softmax')
    ])

    model.compile(
        loss='sparse_categorical_crossentropy',
        optimizer='adam',
        metrics=['accuracy']
    )
    return model

# Example Initialization:
# Assuming a vocabulary size of 88 (full piano keyboard) and input sequence length of 32 notes
model = build_lstm_melody_generator(vocab_size=88, sequence_length=32)
model.summary()
```

### Musical Performance

- **Strengths:** Captures long-range musical dependencies, structural motifs, and thematic patterns. It can construct phrases that return to the primary key signature after multiple bars, making it ideal for highly structured Western classical piano pieces.
- **Weaknesses:** Computational overhead is high, requiring GPU training. If overfitted, LSTMs fall into repetitive loops (monotony circles), playing the exact same note sequences indefinitely.

---

## Algorithmic Comparison: LSTMs vs. Markov Chains

| Metric / Aspect            | First-Order Markov Chain                 | Long Short-Term Memory (LSTM)                 |
| :------------------------- | :--------------------------------------- | :-------------------------------------------- |
| **Modeling Paradigm**      | Probabilistic Transition                 | Deep Recurrent Neural Network                 |
| **Memory Horizon**         | Local (1-step state history)             | Global (remembers long sequence states)       |
| **Primary Musical Fit**    | Indian Classical Ragas (improvisational) | Western Classical Piano (highly structured)   |
| **Data Preprocessing**     | Simple token frequency counting          | Token mapping, sequence chunking, embedding   |
| **Training Requirements**  | CPU-only, runs in milliseconds           | GPU-intensive, takes hours/days               |
| **Computational Overhead** | Near-zero lookup cost                    | High inference processing cost per note       |
| **Risk of Overfitting**    | None (acts as a random-walk generator)   | High (can generate repetitive monotony loops) |
| **Polyphony Support**      | Poor (struggles with simultaneous notes) | High (maps complex chord token groups easily) |

---

## Conclusion

The selection of a sequence-modeling framework depends entirely on the musical genre and available dataset size:

1. **First-Order Markov Chains** are ideal for real-time improvisational systems that must conform strictly to localized rules (such as scale limitations in Indian Ragas) using minimal training data.
2. **Deep LSTMs** are the standard choice for multi-voice, structural compositions (like Western classical piano) where maintaining a historical context is critical for musical sense.

Modern creative AI pipelines increasingly combine the strengths of both: using deep networks (LSTMs or Transformers) to define global direction and structural themes, while employing Markov constraints as an output filter to guarantee local rule compliance.
