
public class Printer {
	
	
	private static final int M = 1000;
	private static final int RR = 50;
	private static final int CC = 4;
	private static final int ORDMAX = 30;
	private int p[] = new int[M + 1];
	private int j = 1;
	private int k = 1;
	private boolean jPrime;
	private int ord = 2;
	private int square = 9;
	private int n = 0;
	private int mult[] = new int[ORDMAX+1];
	
	public Printer() {
		p[1] = 2;
	}
	
	public void processData() {
		while (k < M) {
			do {
				process();
			} while (!isPrime());
			k++;
			p[k] = j;
		}
	}
	
	public void process() {
		j += 2;
		if (j == square) {
			ord++;
			square = p[ord] * p[ord];
			mult[ord - 1] = j;
		}
		n = 2;
		jPrime = true;
	}
	
	public boolean isPrime() {
		while (n < ord && jPrime) {
			while (mult[n] < j)
				mult[n] += p[n] + p[n];
			if (mult[n] == j)
				jPrime = false;
			n++;
		}
		return jPrime;
	}
	
	
	public void printData() {
		
		int pageNumber = 1;
		int pageOffset = 1;
		int rowOffset;
		int c;
		
		while (pageOffset <= M) {
			System.out.printf("The First %d Prime Numbers === Page %d %s", M, pageNumber, "\n\n");
			for (rowOffset = pageOffset; rowOffset <= pageOffset + RR - 1; rowOffset++) {
				for (c = 0; c<= CC - 1; c++)
					if (rowOffset + c * RR <= M)
						System.out.printf("%10d", p[rowOffset + c * RR]);
				System.out.println();
			}
			System.out.println("\f");
			pageNumber++;
			pageOffset += RR * CC;
			
		}
	}
}