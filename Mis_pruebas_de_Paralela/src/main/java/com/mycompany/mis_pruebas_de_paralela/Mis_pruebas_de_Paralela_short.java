package com.mycompany.mis_pruebas_de_paralela;

import java.util.Random;
import java.util.concurrent.RecursiveAction;

public class Mis_pruebas_de_Paralela_short {
    
    //Función para crear un arreglo de números aleatorios.
    //@Input: Tamaño del arreglo
    private static double[] createArray(final int N) {
        final double[] input = new double[N];
        final Random rand = new Random(314);

        for (int i = 0; i < N; i++) {
            input[i] = rand.nextInt(100);
            // No se permiten valores en cero en el arreglo de entrada para evitar la división por cero
            if (input[i] == 0.0) {
                i--;
            }
        }

        return input;
    }
    
    //Suma de recíprocos (Parte concurrente)
    //@Inputs: Arreglo de números
    protected static double seqArraySum(final double[] input) {
        double sum = 0;
        // Calcula la suma de los recíprocos de los elementos del arreglo
        for (int i = 0; i < input.length; i++) {
            
            sum += 1 / input[i];
            
            System.out.print(input[i] + " - " + 1 / input[i] + "\n");
        }

        return sum;
    }
    
    //Calcula el tamaño que debe tener cada chunk
    //@Inputs: Número de chunks en los que se debe dividir el arreglo, número de elementos del arreglo
    private static int getChunkSize(final int nChunks, final int nElements) {
        // Función techo entera
        return (nElements + nChunks - 1) / nChunks;
    }
    
    //Calcula el índice (inclusivo) donde comienza el chunk correspondiente
    //@Inputs: Número del chunk a evaluar, número de chunks en que se divide el arreglo, número de elementos
    //del arreglo.
    private static int getChunkStartInclusive(final int chunk,
            final int nChunks, final int nElements) {
        final int chunkSize = getChunkSize(nChunks, nElements);
        return chunk * chunkSize;
    }
    
    //Calcula el índice (exclusivo) donde termina el chunk correspondiente
    //@Inputs: Número del chunk a evaluar, número de chunks en que se divide el arreglo, número de elementos
    //del arreglo.
    private static int getChunkEndExclusive(final int chunk, final int nChunks,
            final int nElements) {
        final int chunkSize = getChunkSize(nChunks, nElements);
        final int end = (chunk + 1) * chunkSize;
        if (end > nElements) {
            return nElements;
        } else {
            return end;
        }
    }
    
    //Objetos que realizan las sumas del arreglo.
    //@Inputs: Índice de inicio inclusivo del arreglo a evaluar, índice de fin exclusivo del arreglo, el arreglo
    //en sí.
    private static class ReciprocalArraySumTask extends RecursiveAction {
        //índice de inicio inclusivo
        private final int startIndexInclusive;
        //índice de finalización exclusivo
        private final int endIndexExclusive;
        //Arreglo de entrada para la suma de recíprocos.
        private final double[] input;
        //Valor producido por esta tarea.
        private double value;

        //Constructor.
        ReciprocalArraySumTask(final int setStartIndexInclusive,
                final int setEndIndexExclusive, final double[] setInput) {
            this.startIndexInclusive = setStartIndexInclusive;
            this.endIndexExclusive = setEndIndexExclusive;
            this.input = setInput;
        }

        //Retorno del valor producido por la tarea
        public double getValue() {
            return value;
        }
        
        //Uno de los métodos probablemete ya hechos por Jhon, paraleliza la tarea si el tamaño 
        // del arreglo es mayor a 2000
        @Override
        protected void compute() {
            if( endIndexExclusive - startIndexInclusive <= 2000){
                for (int i = startIndexInclusive; i < endIndexExclusive; ++i) {
                    value += (1 / input[i]);
                }
            }else{
                ReciprocalArraySumTask left = new ReciprocalArraySumTask(startIndexInclusive, (startIndexInclusive+endIndexExclusive)/2, input);
                ReciprocalArraySumTask right = new ReciprocalArraySumTask((startIndexInclusive+endIndexExclusive)/2,endIndexExclusive , input);
                left.fork();
                right.compute();
                left.join();
                value = left.getValue() + right.getValue();
            }

        }
    }
    
    //Mi implementación de la solución para la función paralela
    //@Inputs: Número de tareas (Cores) que se utilizan, chunk actual, tamaño del arreglo, arreglo de objetos
    //tareas, arreglo de números que se van a sumar
    protected static double recursive_iteration(int numtasks, int chunk, int length,
            ReciprocalArraySumTask[] tasks, double[] input){
        
        if(numtasks - 2 == chunk){
            tasks[chunk] = new ReciprocalArraySumTask(getChunkStartInclusive(chunk, numtasks, length), getChunkEndExclusive(chunk, numtasks, length), input);
            tasks[chunk].fork();
            tasks[chunk+1] = new ReciprocalArraySumTask(getChunkStartInclusive(chunk, numtasks, length), getChunkEndExclusive(chunk, numtasks, length), input);
            tasks[chunk+1].compute();
            tasks[chunk].join();
            return tasks[chunk].getValue() + tasks[chunk+1].getValue();
        }else{
            tasks[chunk] = new ReciprocalArraySumTask(getChunkStartInclusive(chunk, numtasks, length), getChunkEndExclusive(chunk, numtasks, length), input);
            tasks[chunk].fork();
            double sum = recursive_iteration(numtasks, chunk+1, length, tasks, input);
            tasks[chunk].join();
            
            return tasks[chunk].getValue() + sum;
        }
    }
    
    //Prueba que se realiza
    //@Inputs: Arreglo que se sumará, número de tareas (cores)
    protected static double parManyTaskArraySum(final double[] input, final int numTasks) {
        int length = input.length;
        ReciprocalArraySumTask[] tasks = new ReciprocalArraySumTask[numTasks];
   
        return recursive_iteration(numTasks, 0, length, tasks, input);
    }

    public static void main(String[] args) {
        final int ncores = 8;
        final double minimalExpectedSpeedup = (double)ncores * 0.6;
        double speedup = 0;
        final double[] input = createArray(14);
        final double correct = seqArraySum(input);
        double sum = parManyTaskArraySum(input, ncores);
        final double err = Math.abs(sum - correct);
        if(err != 0){
            final String errMsg = String.format("Correcto: " + correct + " Obtenido: " + sum + " Error: " + err);
            System.out.print(errMsg);
        }else{
            speedup = 1;
        }
        if(minimalExpectedSpeedup > speedup){
            final String errMsg = String.format("Se esperaba que la implmentación de muchas tareas en paralelo pudiera ejecutarse " +
                "%fx veces más rápido, pero solo alcanzo a mejorar la rapidez (speedup) %fx veces", minimalExpectedSpeedup, speedup);
            System.out.print(errMsg);
        }else{
            System.out.print("Reto superado, speedup = " + speedup);
        }
    }
}